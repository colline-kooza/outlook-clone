import React from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function LoginLoader() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background with gradient and image */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
        <div
          className="absolute bottom-0 left-0 right-0 h-[40vh] bg-cover bg-bottom opacity-40 animate-pulse"
          style={{
            backgroundImage: "url('/images/bg.jpg')",
            maskImage: "linear-gradient(to top, black, transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center p-4">
        <Card className="w-full max-w-[400px] shadow-lg backdrop-blur-sm bg-white/95">
          <CardContent className="p-6 space-y-6">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="h-10 w-32 bg-blue-200 animate-pulse rounded-md"></div>
            </div>

            {/* Heading */}
            <div className="space-y-2 text-center">
              <div className="h-8 w-3/4 mx-auto bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-4 w-5/6 mx-auto bg-gray-100 animate-pulse rounded-md"></div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-10 w-full bg-gray-100 animate-pulse rounded-md"></div>
              </div>
              <div className="space-y-2">
                <div className="h-10 w-full bg-gray-100 animate-pulse rounded-md"></div>
              </div>
              <div className="flex justify-end">
                <div className="h-4 w-32 bg-blue-100 animate-pulse rounded-md"></div>
              </div>
              <div className="h-10 w-full bg-blue-200 animate-pulse rounded-md"></div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <div className="h-4 w-16 bg-white"></div>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex justify-center space-x-4">
              <div className="h-10 w-10 bg-gray-100 animate-pulse rounded-md"></div>
              <div className="h-10 w-10 bg-gray-100 animate-pulse rounded-md"></div>
              <div className="h-10 w-10 bg-gray-100 animate-pulse rounded-md"></div>
            </div>

            {/* Sign Up Link */}
            <div className="flex justify-center">
              <div className="h-4 w-48 bg-gray-100 animate-pulse rounded-md"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
