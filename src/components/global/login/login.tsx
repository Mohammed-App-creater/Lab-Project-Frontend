"use client"

import { useState } from "react"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { useFormik } from "formik"
import * as Yup from "yup"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Login values:", values, { rememberMe })
      alert("Login successful!")
    },
  })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-6">
          <div className="flex gap-7 items-center">
            <div className="relative flex">
              <Image
                src="/Vector.svg"
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <Image
                src="/Vector1.svg"
                alt="Logo overlay"
                width={40}
                height={40}
                className="h-10 w-10 absolute left-4.5"
              />
            </div>
            <h1 className="font-bold text-3xl text-[#110051]">CSEC ASTU</h1>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome 👋</h1>
            <p className="text-sm text-muted-foreground">Please login here</p>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#003087]">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="robertallen@example.com"
              className="h-12"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-sm text-red-500">
                {formik.errors.email}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#003087]">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="h-12 pr-10"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <span className="text-sm text-red-500">
                {formik.errors.password}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label htmlFor="remember" className="text-sm font-medium">
              Remember Me
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-[#003087] hover:bg-[#0a2472]/90"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
