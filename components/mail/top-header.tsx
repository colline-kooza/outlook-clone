"use client"

import { Bell, MessageSquare, Search, Settings, X, Minus, Square } from "lucide-react"
import { Input } from "@/components/ui/input"

export function AppHeader() {
  
  return (
    <header className="flex h-12 items-center justify-between bg-[#0078D4] px-4">
      {/* Left section - Logo */}
      <div className="flex items-center">
        <span className="text-base font-semibold text-white">Outlook</span>
      </div>

      {/* Middle section - Search */}
      <div className="flex flex-1 max-w-[28rem] items-center mx-1">
        <div className="relative flex-1">
          <div className="absolute left-5 top-1/2 -translate-y-1/2">
            <Search className="h-4 w-4 text-gray-600 font-medium" />
          </div>
          <Input
            type="text"
            placeholder="Search"
            className="w-full bg-white border-0 pl-10 text-black placeholder:text-gray-700 focus-visible:ring-1 font-medium focus-visible:ring-white/30"
          />
        </div>
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-white/10 rounded-sm">
          <MessageSquare className="h-5 w-5 text-white font-light" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-sm">
          <Bell className="h-5 w-5 text-white font-light" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-sm">
          <Settings className="h-5 w-5 text-white font-light" />
        </button>

        {/* Window controls */}
        <div className="flex ml-2">
          <button className="p-2 hover:bg-white/10">
            <Minus className="h-5 w-5 text-white font-light" />
          </button>
          <button className="p-2 hover:bg-white/10">
            <Square className="h-4 w-4 text-white font-light" />
          </button>
          <button className="p-2 hover:bg-white/10">
            <X className="h-5 w-5 text-white font-light" />
          </button>
        </div>
      </div>
    </header>
  )
}

