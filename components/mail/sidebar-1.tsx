"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SidebarItem {
  icon: string
  label: string
  href: string
}

const sidebarItems: SidebarItem[] = [
  {
    icon: "https://cdn-icons-png.flaticon.com/128/726/726623.png",
    label: "Home",
    href: "/home",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/18349/18349414.png",
    label: "Profile",
    href: "/profile",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/143/143438.png",
    label: "All Apps",
    href: "/apps",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/15465/15465764.png",
    label: "Word",
    href: "/word",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/15465/15465638.png",
    label: "Excel",
    href: "/excel",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/888/888874.png",
    label: "PowerPoint",
    href: "/powerpoint",
  },
 
]

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState("/home")

  return (
    <div className="flex h-screen w-14 flex-col items-center bg-blue-50 pt-1">
      {sidebarItems.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "group relative flex h-10 w-10 items-center justify-center",
            activeItem === item.href && "bg-gray-100",
            // Add margin to create space between groups of icons
            index === 0 && "mb-1", // Space after home
            index === 1 && "mb-1", // Space after profile
            index === 4 && "mb-1", // Space after PowerPoint
          )}
          onClick={() => setActiveItem(item.href)}
        >
          <Image
            src={item.icon || "/placeholder.svg"}
            alt={item.label}
            width={20}
            height={20}
            className="transition-transform duration-100 group-hover:scale-110 object-contain"
          />

          {/* Tooltip */}
          <div className="absolute left-14 hidden rounded-md bg-gray-900 px-2 py-1 text-sm text-white group-hover:block">
            {item.label}
          </div>
        </Link>
      ))}
    </div>
  )
}

