import Footer from "@/components/frontend/site-footer"
import SiteHeader from "@/components/frontend/site-header"
import SmallScreenMessage from "@/components/SmallScreenMessage"
import { authOptions } from "@/config/auth"
import { getServerSession } from "next-auth"
import type { ReactNode } from "react"

export default async function HomeLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <div className="bg-[#f5f5f5] mx-auto">
      {/* Small Screen Message */}
      <div className="md:hidden">
        <SmallScreenMessage />
      </div>

      {/* Content for medium and large screens */}
      <div className="hidden md:block">
        {children}
      </div>
    </div>
  )
}

