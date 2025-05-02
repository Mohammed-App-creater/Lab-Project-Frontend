"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserData } from "@/types/user";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface OptionalInfoTabProps {
  userData: UserData;
  onCancel: () => void;
  onSave: (updatedData: UserData) => void;
}

const validationSchema = Yup.object({
  universityId: Yup.string().required("University ID is required"),
  linkedin: Yup.string().url("Enter a valid URL"),
  instagram: Yup.string().matches(/^\S*$/, "No spaces allowed"),
  cv: Yup.string().url("Enter a valid CV URL"),
  codeforces: Yup.string(),
  leetcode: Yup.string(),
  dateOfBirth: Yup.string(),
  joiningDate: Yup.string(),
  shortBio: Yup.string(),
});

export default function OptionalInfoTab({ userData, onCancel, onSave }: OptionalInfoTabProps) {
  return (
    <Formik
      initialValues={userData}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await fetch("https://csec-lab-portal-backend.onrender.com/api/user/update-user-profile", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          if (!res.ok) {
            throw new Error("Failed to update user info");
          }

          const updatedUser = await res.json();
          onSave(updatedUser);
        } catch (error) {
          console.error("Error updating user:", error);
          // You can show toast here (e.g. react-hot-toast)
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Field name="universityId" as={Input} placeholder="University ID" />
              <ErrorMessage name="universityId" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="instagram" as={Input} placeholder="Instagram Handle" />
              <ErrorMessage name="instagram" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="linkedin" as={Input} placeholder="LinkedIn URL" />
              <ErrorMessage name="linkedin" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="dateOfBirth" as={Input} type="date" placeholder="Date of Birth" />
            </div>

            <div>
              <Field name="codeforces" as={Input} placeholder="Codeforces Handle" />
            </div>

            <div>
              <Field name="cv" as={Input} placeholder="CV URL" />
              <ErrorMessage name="cv" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="leetcode" as={Input} placeholder="Leetcode Handle" />
            </div>

            <div>
              <Field name="joiningDate" as={Input} type="date" placeholder="Joining Date" />
            </div>
          </div>

          <div className="mt-4">
            <Field
              name="shortBio"
              as="textarea"
              placeholder="Short Bio"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="flex justify-end mt-8 gap-3">
            <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-800 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
