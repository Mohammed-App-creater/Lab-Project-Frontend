
"use client"

import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, 
  
  SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  generatedPassword: Yup.string().required("Password is required"),
})

// { onCancel }: { onCancel: () => void }
export default function AddNewMember({ onCancel }: { onCancel: () => void }) {
  const [generatedPassword, setGeneratedPassword] = useState("")

  // Generate a random password
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setGeneratedPassword(password)
    formik.setFieldValue("generatedPassword", password)
  }


type FormValues = {
  email: string;
  generatedPassword: string;
};

  // Initialize Formik
const formik = useFormik<FormValues>({
  initialValues: {
    email: "",
    generatedPassword: "",
  },
  validationSchema,
  onSubmit: async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data: { message: string } = await response.json();
      console.log("Success:", data.message);

      resetForm();
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setSubmitting(false);
    }
  },
})

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-6 text-center">Add New Member</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Division Select */}
            <div>
              <Select
                name="division"
                // onValueChange={(value) => formik.setFieldValue("division", value)}
                // value={formik.values.division}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select Division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Development</SelectItem>
                  <SelectItem value="marketing">CBD</SelectItem>
                  <SelectItem value="sales">Cyber</SelectItem>
                  <SelectItem value="hr">CPD</SelectItem>
                </SelectContent>
              </Select>

            </div>

            {/* Group Select */}
            <div>
              <Select
                name="group"
                // onValueChange={(value) => formik.setFieldValue("group", value)}
                // value={formik.values.group}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team-a">Group 1</SelectItem>
                  <SelectItem value="team-b">Group 2</SelectItem>
                  <SelectItem value="team-c">Group 3</SelectItem>
                </SelectContent>
              </Select>

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
                className="bg-white"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Random Password */}
            <div className="flex items-center gap-2">
              <Input
                id="randomPassword"
                name="randomPassword"
                placeholder="Random Password"
                value={generatedPassword}
                readOnly
                className="bg-white flex-1"
              />
              <Button type="button" onClick={generatePassword} className="bg-blue-800 hover:bg-blue-700 text-white">
                Generate
              </Button>
            </div>

            {/* Enter Generated Password */}
            <div>
              <Input
                id="generatedPassword"
                name="generatedPassword"
                placeholder="Enter Generated Password"
                value={formik.values.generatedPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-white"
              />
              {formik.touched.generatedPassword && formik.errors.generatedPassword && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.generatedPassword}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" className="px-6" onClick={onCancel} >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white px-6">
                Invite
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}














