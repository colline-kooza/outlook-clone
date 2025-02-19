"use client"

import { useState } from "react"
import { MoreHorizontal, Star, Grid2X2, ArrowDownUp, Mail, Loader2, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { EmailData } from "@/types/types"
import { formatDistanceToNow } from 'date-fns'
import { deleteEmail } from "@/actions/email"
import toast from "react-hot-toast"
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "../ui/dialog"

interface MailListProps {
  emails: {
    received: any[]
    sent: any[]
  }
  onEmailSelect: (email: EmailData) => void

}

export function MailList({ emails,onEmailSelect }: MailListProps) {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<"received" | "sent">("received")
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const safeEmails = {
    received: emails?.received || [],
    sent: emails?.sent || []
  }
  
  const currentEmails = safeEmails[currentView]
  console.log(currentEmails)
  const getInitials = (name: string | undefined) => {
    if (!name) return 'UN' // UN for Unknown
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-500">
      <Mail className="h-16 w-16 stroke-current opacity-20" />
      <p className="text-sm">No emails currently</p>
    </div>
  )
  const handleDelete = async () => {
    if (!emailToDelete) return

    setLoading(true)
    const result = await deleteEmail(emailToDelete)
    setLoading(false)

    if (result.success) {
      toast.success("Email deleted successfully!")
      setEmailToDelete(null)
      
    } else {
      toast.error(result.message || "Failed to delete email.")
    }
  }
  if (!currentEmails?.length) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">
              {currentView === 'received' ? 'Inbox' : 'Sent'}
            </h2>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Star className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant={currentView === 'received' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('received')}
              className="text-sm"
            >
              Received
            </Button>
            <Button 
              variant={currentView === 'sent' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('sent')}
              className="text-sm"
            >
              Sent
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <EmptyState />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            {currentView === 'received' ? 'Inbox' : 'Sent'}
          </h2>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Star className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
        <div className="bg-gray-100 p-1 rounded-lg inline-flex">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCurrentView("received")}
        className={`text-sm transition-all ${
          currentView === "received" ? "bg-blue-500 text-white hover:bg-blue-600" : "text-gray-700 hover:bg-gray-200"
        }`}
      >
        Received
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCurrentView("sent")}
        className={`text-sm transition-all ${
          currentView === "sent" ? "bg-blue-500 text-white hover:bg-blue-600" : "text-gray-700 hover:bg-gray-200"
        }`}
      >
        Sent
      </Button>
    </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y">
          {currentEmails.map((email) => (
            <div
              key={email.id}
              className={`group flex items-center cursor-pointer gap-4 px-4 py-2 hover:bg-gray-50 ${
                selectedEmail === email.id ? "bg-blue-50" : ""
              }`}
              onClick={() => {
                setSelectedEmail(email.id)
                onEmailSelect(email)
              }}
            >
             <Avatar className="h-8 w-8">
               <AvatarImage 
             src={currentView === 'received' ? email.from.image || '' : email.to.image || ''} 
             alt={currentView === 'received' ? email.from.name : email.to.name} 
            />
           <AvatarFallback className="bg-purple-700 text-purple-100">
                {currentView === 'received' 
            ? getInitials(email.from.name)
            : getInitials(email.to.name)}
           </AvatarFallback>
           </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                <span className="font-medium">
  {currentView === 'received' ? email.from.name : email.to.name}
</span>

                  <span className="ml-auto text-xs  text-gray-500">
                    {formatDistanceToNow(new Date(email.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <div className="text-xs font-medium text-gray-900">{email.subject}</div>
              
                <div className="truncate text-xs text-gray-500 line-clamp-1" dangerouslySetInnerHTML={{ __html: email.content }} />
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      setEmailToDelete(email.id)
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                {emailToDelete && (
                  <DialogContent className="p-6">
                    <h2 className="text-lg font-semibold mb-2">Delete Email?</h2>
                    <p className="text-gray-600 text-sm">Are you sure you want to delete this email? This action cannot be undone.</p>
                    <DialogFooter className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setEmailToDelete(null)}>Cancel</Button>
                      <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={loading}
                      >
                        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                )}
              </Dialog>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex items-center justify-between border-t bg-gray-50 px-4 py-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Getting too much mail?</span>
        </div>
        <Button variant="link" className="text-sm text-blue-600">
          Unsubscribe
        </Button>
      </div>
    </div>
  )
}