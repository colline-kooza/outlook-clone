"use client"

import { Archive, ChevronDown, Flag, Mail, MoreHorizontal, ReplyAll, Trash2, Undo, AlertTriangle, Menu, FolderArchive } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Separator } from '../ui/separator'

interface MailToolbarProps {
  onNewMail: () => void
  onDelete?: () => void
  onArchive?: () => void
  onReport?: () => void
  onMoveTo?: () => void
  onReplyAll?: () => void
  onToggleRead?: () => void
  onToggleFlag?: () => void
  onUndo?: () => void
  selectedEmails?: string[] // Array of selected email IDs
}

export function MailToolbar({ 
  onNewMail,
  onDelete,
  onArchive,
  onReport,
  onMoveTo,
  onReplyAll,
  onToggleRead,
  onToggleFlag,
  onUndo,
  selectedEmails = []
}: MailToolbarProps) {
  const hasSelection = selectedEmails.length > 0

  return (
    <div className="flex h-24 border-b px-2 gap-1 flex-col">
      {/* Left section - Menu and Navigation */}
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Menu className="h-6 w-6" />
        </Button>
        
        <div className="ml-2 flex items-center gap-4">
          <button className="h-8 text-base font-semibold hover:bg-gray-100">
            Home
          </button>
          <button className="h-8 text-sm font-medium hover:bg-gray-100">
            View
          </button>
          <button className="h-8 text-sm font-medium hover:bg-gray-100">
            Help
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-1 items-center gap-1 shadow-sm max-w-[90rem] bg-white pl-3 rounded-lg justify-between pr-3">
        <Button 
          className="gap-2 bg-[#0078d4]"
          onClick={onNewMail}
        >
          <Mail className="h-4 w-4" />
          New mail
          <ChevronDown className="h-4 w-4" />
        </Button>

        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1 border-none"
          onClick={onDelete}
          disabled={!hasSelection}
        >
          <Trash2 className="h-4 w-4" />
          Delete
          <ChevronDown className="h-3 w-3" />
        </Button>
        <Separator orientation="vertical" className="mx-2 h-6" />

        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1 border-none"
          onClick={onArchive}
          disabled={!hasSelection}
        >
          <Archive className="h-4 w-4 text-[rgb(151,183,109)]" />
          Archive
        </Button>
        <Separator orientation="vertical" className="mx-2 h-6" />

        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1 border-none"
          onClick={onReport}
          disabled={!hasSelection}
        >
          <AlertTriangle className="h-4 w-4 text-red-300" />
          Report
          <ChevronDown className="h-3 w-3" />
        </Button>
        <Separator orientation="vertical" className="mx-2 h-6" />

        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1 border-none"
          onClick={onMoveTo}
          disabled={!hasSelection}
        >
          <FolderArchive className="h-4 w-4" />
          Move to
          <ChevronDown className="h-3 w-3" />
        </Button>
        <Separator orientation="vertical" className="mx-2 h-6" />

        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1 border-none"
          onClick={onReplyAll}
          disabled={!hasSelection}
        >
          <ReplyAll className="h-4 w-4 text-orange-300" />
          Reply all
          <ChevronDown className="h-3 w-3" />
        </Button>
        <Separator orientation="vertical" className="mx-2 h-6" />

        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1 border-none"
          onClick={onToggleRead}
          disabled={!hasSelection}
        >
          <Mail className="h-4 w-4 text-purple-400" />
          Read / Unread
        </Button>
        <Separator orientation="vertical" className="mx-2 h-6" />

        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1 border-none"
          onClick={onToggleFlag}
          disabled={!hasSelection}
        >
          <Flag className="h-4 w-4 text-green-300" />
          Flag / Unflag
          <ChevronDown className="h-3 w-3" />
        </Button>
        <Separator orientation="vertical" className="mx-2 h-6" />

        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1"
          onClick={onUndo}
        >
          <Undo className="h-4 w-4" />
          Undo
        </Button>

        <Button variant="outline" size="sm" className="h-8 w-8 px-0">
          <MoreHorizontal className="h-4 w-4 text-gray-900" />
        </Button>
      </div>
    </div>
  )
}