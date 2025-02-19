"use client"

import type React from "react"
import { useState } from "react"
import { Archive, ChevronDown, ChevronRight, File, Inbox, Mail, Send, Trash2, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"

interface FolderItem {
  icon: React.ReactNode
  label: string
  count?: number
}

interface FolderSection {
  title: string
  items: FolderItem[]
  isExpanded?: boolean
}

interface MailSidebarProps {
  inboxCount: number
  sentItemsCount: number
  draftsCount: number
  junkCount: number
  deletedItemsCount: number
  outboxCount: number
  userEmail:string | null | undefined
}

export function MailSidebar({
  inboxCount,
  sentItemsCount,
  draftsCount,
  junkCount,
  deletedItemsCount,
  outboxCount,
  userEmail
}: MailSidebarProps) {
  const [sections, setSections] = useState<FolderSection[]>([
    {
      title: "Favorites",
      isExpanded: true,
      items: [
        { icon: <Inbox className="h-4 w-4" />, label: "Inbox", count: inboxCount },
        { icon: <Send className="h-4 w-4" />, label: "Sent Items", count: sentItemsCount },
        { icon: <File className="h-4 w-4" />, label: "Drafts", count: draftsCount },
        { icon: <Archive className="h-4 w-4" />, label: "Archive" },
      ],
    },
    {
      title: userEmail || "No Email Provided",
      isExpanded: true,
      items: [
        { icon: <Inbox className="h-4 w-4" />, label: "Inbox", count: inboxCount },
        { icon: <Mail className="h-4 w-4" />, label: "Junk Email", count: junkCount },
        { icon: <File className="h-4 w-4" />, label: "Drafts", count: draftsCount },
        { icon: <Send className="h-4 w-4" />, label: "Sent Items", count: sentItemsCount },
        { icon: <Trash2 className="h-4 w-4" />, label: "Deleted Items", count: deletedItemsCount },
        { icon: <Archive className="h-4 w-4" />, label: "Archive" },
        { icon: <Mail className="h-4 w-4" />, label: "Outbox", count: outboxCount },
      ],
    },
  ])

  const [selectedItem, setSelectedItem] = useState(`${userEmail} || "No Email Provided"... Inbox`)

  const toggleSection = (index: number) => {
    setSections((prev) =>
      prev.map((section, i) => (i === index ? { ...section, isExpanded: !section.isExpanded } : section)),
    )
  }

  return (
    <div className="w-64 flex flex-col h-full border-r">
      <div className="flex-1 overflow-y-auto">
        {sections.map((section, sectionIndex) => (
          <div key={section.title} className="py-1">
            <button
              onClick={() => toggleSection(sectionIndex)}
              className="flex items-center w-full px-4 py-1  text-gray-500 hover:text-gray-900  text-base font-semibold"
            >
              {section.isExpanded ? (
                <ChevronDown className="h-3 w-3 mr-1" />
              ) : (
                <ChevronRight className="h-3 w-3 mr-1" />
              )}
              {section.title}
            </button>

            {section.isExpanded && (
              <div className="mt-1">
                {section.items.map((item) => {
                  const itemKey = `${section.title} ${item.label}`
                  return (
                    <button
                      key={itemKey}
                      onClick={() => setSelectedItem(itemKey)}
                      className={cn(
                        "flex items-center w-full px-4 py-1.5 text-sm hover:bg-gray-100",
                        selectedItem === itemKey && "bg-blue-100",
                      )}
                    >
                      <span className="mr-2 text-gray-600 ">{item.icon}</span>
                      <span>{item.label}</span>
                      {item.count !== undefined && <span className="text-gray-600 ml-auto">{item.count}</span>}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add account button */}
      <button className="flex items-center font-bold px-4 py-2 text-sm text-blue-600 hover:bg-gray-100">
        <UserPlus className="h-4 w-4 mr-3" />
        Add account
      </button>
    </div>
  )
}
