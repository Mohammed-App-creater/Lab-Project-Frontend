"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";

type FormValues = {
  email: string;
  password: string;
  divisionId: string;
  groupId: string;
  gender: string;
};

export default function AddNewMember({ 
  onCancel, 
  divisionId, 
  groupId,
  page = 1,
  limit = 10,
}: { 
  onCancel: () => void;
  divisionId: string;
  groupId: string;
  page?: number;
  limit?: number;
}) {
  const queryClient = useQueryClient();
  const [password, setPassword] = useState("");

  // Formik setup
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      divisionId: divisionId,
      groupId: groupId,
      gender: "Male",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      registerMutation.mutate(values);
    },
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
      if (response.config.method?.toLowerCase() === "options") {
        return null; // Skip preflight
      }
      return response.data;
    },
    onSuccess: () => {
      formik.resetForm();
      toast.success("Member invited successfully!");
      queryClient.refetchQueries({ queryKey: ["group-members", groupId, page, limit] });
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-sm shadow-lg">
        <CardContent className="">
          <h2 className="text-xl font-bold mb-6">Add New Member</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
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