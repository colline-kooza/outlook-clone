"use client"

import { ArrowLeft, ArrowRight, MoreHorizontal, Reply } from "lucide-react"
import { format } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { EmailData } from "@/types/types"

interface MailPreviewProps {
  email: EmailData | null
}

export function MailPreview({ email }: MailPreviewProps) {
  // console.log(email?.from.image , email?.from.name)
  if (!email) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Select an email to preview</p>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-8.5rem)] flex-col bg-white rounded-sm">
      {/* Header - Fixed */}
      <div className="flex items-center justify-between px-6 py-2 border-b">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">{email.subject}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Sender Info - Fixed */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center space-x-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={email.from.image || ""} alt={email.from.name} />
            <AvatarFallback>{email.from.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{email.from.name}</div>
            <div className="text-sm text-muted-foreground">{email.from.email}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <time className="text-sm text-muted-foreground">{format(new Date(email.createdAt), "h:mm a")}</time>
          <Button variant="secondary" size="sm">
            <Reply className="mr-2 h-4 w-4" />
            Reply
          </Button>
        </div>
      </div>

      {/* Actions - Fixed */}
      <div className="flex items-center space-x-2 px-6 py-2 border-b">
        <Button variant="ghost" size="sm">
          Unsubscribe
        </Button>
        <Button variant="ghost" size="sm">
          Manage subscriptions
        </Button>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-6">
          <div dangerouslySetInnerHTML={{ __html: email.content }} />
        </div>
      </ScrollArea>
    </div>
  )
}

