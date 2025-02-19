"use client"

import { Eye, EyeOff, Loader2, Lock, Mail, User, Headset } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import type { UserProps } from "@/types/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { createUser } from "@/actions/users"

export default function RegisterForm() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [emailErr, setEmailErr] = useState<string | null>(null)
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<UserProps>()

  const router = useRouter()

  async function onSubmit(data: UserProps) {
    setLoading(true)
    data.name = `${data.firstName} ${data.lastName}`
    data.image = "https://utfs.io/f/59b606d1-9148-4f50-ae1c-e9d02322e834-2558r.png"
    try {
      const res = await createUser(data)
      if (res.status === 409) {
        setLoading(false)
        setEmailErr(res.error)
      } else if (res.status === 200) {
        setLoading(false)
        toast.success("Account Created successfully")
        router.push("/login")
      } else {
        setLoading(false)
        toast.error("Something went wrong")
      }
    } catch (error) {
      setLoading(false)
      console.error("Network Error:", error)
      toast.error("It seems something is wrong, try again")
    }
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background with gradient and image */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
        <div
          className="absolute bottom-0 left-0 right-0 h-[40vh] bg-cover bg-bottom opacity-40"
          style={{
            backgroundImage: "url('/images/bg.jpg')",
            maskImage: "linear-gradient(to top, black, transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center p-4">
        <Card className="w-full max-w-[500px] shadow-lg backdrop-blur-sm bg-white/95">
          <CardContent className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900">Welcome Create Account</h1>
              <p className="text-sm text-gray-800">
                Create your <span className="text-blue-600">Out Look</span> Account today to get started and Enjoy privileges Around
              </p>
              <div className="flex justify-center">
                <div className="flex space-x-2 items-center cursor-pointer">
                  <img src="/Outlook-1.svg" alt="Outlook" className="w-10 h-10" />
                  <img src="/Outlook-2.svg" alt="Gmail" className="w-10 h-10" />
                  <img src="/Outlook-3.svg" alt="Yahoo" className="w-10 h-10" />
                  <img src="/Outlook-4.svg" alt="iCloud" className="w-10 h-10" />
                  <img src="/Outlook-5.svg" alt="iCloud" className="w-10 h-10" />
                </div>
              </div>
             
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      {...register("firstName", { required: "First Name is required" })}
                      placeholder="First Name"
                      className="pl-10"
                    />
                    <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  </div>
                  {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      {...register("lastName", { required: "Last Name is required" })}
                      placeholder="Last Name"
                      className="pl-10"
                    />
                    <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  </div>
                  {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      {...register("phone", { required: "Phone is required" })}
                      placeholder="Phone"
                      className="pl-10"
                    />
                    <Headset className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      {...register("email", { required: "Email is required" })}
                      type="email"
                      placeholder="Email"
                      className="pl-10"
                    />
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  </div>
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  {emailErr && <p className="text-xs text-red-500">{emailErr}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Input
                    {...register("password", { required: "Password is required" })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="pl-10 pr-10"
                  />
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-gray-800" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Please wait..
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon" onClick={() => signIn("google")} className="w-10 h-10">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/732/732221.png"
                  alt="microsoft"
                  className="w-5 h-5 object-contain"
                />
              </Button>
              <Button variant="outline" size="icon" onClick={() => signIn("google")} className="w-10 h-10">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
                  alt="Google"
                  className="w-5 h-5 object-contain"
                />
              </Button>
              <Button variant="outline" size="icon" onClick={() => signIn("github")} className="w-10 h-10">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
                  alt="GitHub"
                  className="w-5 h-5 object-contain"
                />
              </Button>
              <Button variant="outline" size="icon" onClick={() => signIn("apple")} className="w-10 h-10">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/731/731985.png"
                  alt="Apple"
                  className="w-5 h-5 object-contain"
                />
              </Button>
            </div>

            <p className="text-center text-sm text-gray-500">
              Already Registered?{" "}
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

