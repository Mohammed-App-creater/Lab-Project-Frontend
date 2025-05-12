"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import PageLoader from "./pageLoader";
import { data as user } from "@/lib/types";

export default function LoginPage() {
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const router = useRouter();

  type LoginValues = {
    email: string;
    password: string;
    remember: boolean;
  };

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const loginFormik = useFormik<LoginValues>({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setError("");
        setSubmitting(true);
        setIsPageLoading(true);
        // Send the form data to the server
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}api/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          throw new Error("Invalid credentials");
        }

        const data: { accessToken: string; user: user } =
          await response.json();
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("userRole", data.user.Role.name);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
        resetForm();
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log("Login failed:", error.message);
          setError(error.message);
        } else {
          console.error("Login failed:", error);
        }
      } finally {
        setIsPageLoading(false);
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        loginFormik.handleSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyDown as EventListener);

    return () => {
      document.removeEventListener("keydown", handleKeyDown as EventListener);
    };
  }, [loginFormik]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      {isPageLoading && <PageLoader fullPage={true} />}
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-6">
          <div className="flex gap-7 items-center justify-center">
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
            <h1 className="font-bold text-3xl text-[#110051] dark:text-[hsl(253,100%,50%)]">CSEC ASTU</h1>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome 👋</h1>
            <p className="text-sm text-muted-foreground">Please login here</p>
          </div>
          {error && (
            <div className="text-sm p-4 bg-red-100 rounded-r-lg  border-l-4 border-red-600  text-red-500">
              <p className="text-lg">
                {error} <span className="text-4xl">😒</span>
              </p>
            </div>
          )}
        </div>

        <form onSubmit={loginFormik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#003087] dark:text-[hsl(253,100%,50%)]">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="robertallen@example.com"
              className="h-12"
              value={loginFormik.values.email}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
            />
            {loginFormik.touched.email && loginFormik.errors.email && (
              <span className="text-sm text-red-500">
                {loginFormik.errors.email}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#003087] dark:text-[hsl(253,100%,50%)]">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="h-12 pr-10"
                value={loginFormik.values.password}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {loginFormik.touched.password && loginFormik.errors.password && (
              <span className="text-sm text-red-500">
                {loginFormik.errors.password}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={remember}
              onCheckedChange={(checked) => setRemember(checked as boolean)}
            />
            <Label htmlFor="remember" className="text-sm font-medium">
              Remember Me
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-[#003087] hover:bg-[#0a2472]/90 dark:text-white"
            disabled={loginFormik.isSubmitting}
          >
            {loginFormik.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
