"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import PageLoader from "../global/login/pageLoader";
import api from "@/lib/axios";
import { toast } from "sonner";


type Division = {
  id: string;
  name: string;
};

type Groups = {
  id: string;
  name: string;
  groups: Group[];
};

type Group = {
  id: string;
  name: string;
  discription: string;
};

type FormValues = {
  email: string;
  password: string;
  divisionId: string;
  groupId: string;
  gender: string;
};

export default function AddNewMember({ onCancel }: { onCancel: () => void }) {
  const [password, setPassword] = useState("");

  // Formik setup
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      divisionId: "",
      groupId: "",
      gender: "Male",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      divisionId: Yup.string().required("Division is required"),
      groupId: Yup.string().required("Group is required"),
    }),
    onSubmit: (values) => {
      registerMutation.mutate(values);
    },
  });

  // Fetch divisions
  const {
    data: divisions,
    isLoading: isLoadingDivisions,
    isError: isErrorDivisions,
  } = useQuery<Division[]>({
    queryKey: ["divisions"],
    queryFn: async () => {
      const response = await api.get("api/division/divisions");
      return response.data;
    },
    staleTime: 60 * 1000,
  });

  // Fetch groups based on selected division
  const {
    data: groups,
    isLoading: isLoadingGroups,
    isError: isErrorGroups,
  } = useQuery<Groups>({
    queryKey: ["groups", formik.values.divisionId], // Include divisionId in query key
    queryFn: async () => {
      if (!formik.values.divisionId) return [];
      const response = await api.post("api/division/groups", {
        divisionId: formik.values.divisionId,
      });
      return response.data;
    },
    enabled: !!formik.values.divisionId, // Only enable when division is selected
    staleTime: 60 * 1000,
  });
  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const response = await api.post("api/user/register", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        }
      });
      return response.data;
    },
    onSuccess: () => {
      formik.resetForm();
      toast.success("Member invited successfully!");
      onCancel();
    },
    onError: (error: import("axios").AxiosError) => {
      if (error.response) {
        const errorMessage = (error.response?.data as { message?: string })?.message || "Failed to invite member";
        toast.error(errorMessage);
      } else {
        toast.error("Network error. Please try again.");
      }
    },
  });

  // Generate password
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(password);
    formik.setFieldValue("password", password);
  };

  // Handle division change
  const handleDivisionChange = (value: string) => {
    formik.setFieldValue("divisionId", value);
    formik.setFieldValue("groupId", ""); // Reset group when division changes
  };

  // Show loading state only for specific components
  if (isErrorDivisions || isErrorGroups) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <Card className="w-full max-w-sm shadow-lg">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Error Loading Data</h2>
            <p className="text-red-500 mb-4">
              Failed to load required data. Please try again.
            </p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-sm shadow-lg">
        <CardContent className="">
          <h2 className="text-xl font-bold mb-6">Add New Member</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Division Select */}
            <div>
              <Select
                name="divisionId"
                onValueChange={handleDivisionChange}
                value={formik.values.divisionId}
              >
                <SelectTrigger className="w-full py-7 bg-white">
                  <SelectValue placeholder="Select Division" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingDivisions ? (
                    <div className="flex justify-center py-4">
                      <PageLoader fullPage={false} />
                    </div>
                  ) : (
                    divisions?.map((division) => (
                      <SelectItem key={division.id} value={division.id}>
                        {division.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {formik.touched.divisionId && formik.errors.divisionId && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.divisionId}
                </p>
              )}
            </div>

            {/* Group Select */}
            <div>
              <Select
                name="groupId"
                onValueChange={(value) =>
                  formik.setFieldValue("groupId", value)
                }
                value={formik.values.groupId}
                disabled={!formik.values.divisionId || isLoadingGroups}
              >
                <SelectTrigger className="w-full py-7 bg-white">
                  <SelectValue
                    placeholder={
                      !formik.values.divisionId
                        ? "Select division first"
                        : isLoadingGroups
                        ? "Loading groups..."
                        : groups?.groups.length === 0
                        ? "No groups available"
                        : "Select Group"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingGroups ? (
                    <div className="flex justify-center py-4">
                      <PageLoader fullPage={false} />
                    </div>
                  ) : (groups?.groups ?? []).length > 0 ? (
                    (groups?.groups ?? []).map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="text-center py-2 text-sm text-gray-500">
                      No groups found for this division
                    </div>
                  )}
                </SelectContent>
              </Select>
              {formik.touched.groupId && formik.errors.groupId && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.groupId}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <Input
                id="email"
                name="email"
                placeholder="Enter Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-white py-7"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Random Password */}
            <div className="flex items-center gap-2">
              <Input
                id="randomPassword"
                name="randomPassword"
                placeholder="Random Password"
                value={password}
                readOnly
                className="bg-white flex-1 py-6"
              />
              <Button
                type="button"
                onClick={generatePassword}
                className="bg-blue-800 hover:bg-blue-700 py-6 text-white"
              >
                Generate
              </Button>
            </div>

            {/* Enter Generated Password */}
            <div>
              <Input
                id="password"
                name="password"
                placeholder="Enter Generated Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-white py-6"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="px-6 py-6 flex-1"
                onClick={onCancel}
                disabled={registerMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-800 hover:bg-blue-700 text-white flex-1 px-6 py-6"
                disabled={registerMutation.isPending || !formik.isValid}
              >
                {registerMutation.isPending ? "Inviting..." : "Invite"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
