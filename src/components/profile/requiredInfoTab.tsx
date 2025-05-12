"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { user } from "../../../types/user";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface RequiredInfoTabProps {
  userData: user;
  onCancel: () => void;
  onSave: (updatedData: user) => void;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.string().required("Date of Birth is required"),
  github: Yup.string().url("Enter a valid Github URL"),
  telegramHandle: Yup.string(),
  expectedGraduationYear: Yup.string(),
  specialization: Yup.string(),
  department: Yup.string(),
  mentor: Yup.string(),
});

export default function RequiredInfoTab({
  onCancel,
  onSave,
}: RequiredInfoTabProps) {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        github: "",
        telegramHandle: "",
        expectedGraduationYear: "",
        specialization: "",
        department: "",
        mentor: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACK_END_URL}api/user/update`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }
          );

          if (!res.ok) {
            throw new Error("Failed to update required info");
          }

          const updatedUser = await res.json();
          onSave(updatedUser);
        } catch (err) {
          console.error("Update error:", err);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ handleChange, isSubmitting }) => (
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-400">
            {/* First Name */}
            <div>
              <Field
                name="firstName"
                as={Input}
                placeholder="First Name"
                onChange={handleChange}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Last Name */}
            <div>
              <Field
                name="lastName"
                as={Input}
                placeholder="Last Name"
                onChange={handleChange}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <Field
                name="phone"
                as={Input}
                placeholder="Mobile Number"
                onChange={handleChange}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <Field
                name="email"
                as={Input}
                placeholder="Email Address"
                onChange={handleChange}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <Field
                name="dateOfBirth"
                as={Input}
                type="date"
                placeholder="Date of Birth"
                onChange={handleChange}
              />
              <ErrorMessage
                name="dateOfBirth"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Github */}
            <div>
              <Field
                name="github"
                as={Input}
                placeholder="Github "
                onChange={handleChange}
              />
              <ErrorMessage
                name="github"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Gender */}
            <div>
              <Field name="gender">
                {({
                  field,
                  form,
                }: {
                  field: { name: string; value: string };
                  form: {
                    setFieldValue: (field: string, value: string) => void;
                  };
                }) => (
                  <Select
                    value={field.value}
                    onValueChange={(val) => form.setFieldValue("gender", val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Gender"
                        className="text-gray-500"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Telegram Handle */}
            <div>
              <Field
                name="telegramHandle"
                as={Input}
                placeholder="Telegram Handle"
                onChange={handleChange}
              />
            </div>

            {/* Expected Graduation Year */}
            <div>
              <Field
                name="expectedGraduationYear"
                as={Input}
                placeholder="Expected Graduation Year"
                onChange={handleChange}
              />
            </div>

            {/* Specialization */}
            <div>
              <Field
                name="specialization"
                as={Input}
                placeholder="Specialization"
                onChange={handleChange}
              />
            </div>

            {/* Department */}
            <div>
              <Field
                name="department"
                as={Input}
                placeholder="Department"
                onChange={handleChange}
              />
            </div>

            {/* Mentor */}
            <div>
              <Field
                name="mentor"
                as={Input}
                placeholder="Mentor"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end mt-8 gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
            >
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
