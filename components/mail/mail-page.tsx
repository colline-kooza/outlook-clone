"use client"
import { useState } from "react"
import { MailList } from "@/components/mail/email-list"
import { MailPreview } from "@/components/mail/email-preview"
import { AppSidebar } from "@/components/mail/sidebar-1"
import { AppHeader } from "@/components/mail/top-header"
import { MailToolbar } from "@/components/mail/top-header-2"
import { MailSidebar } from "@/components/mail/mail-side-bar"
import type { EmailData } from "@/types/types"
import EmailComposer from "./EmailComposer"

interface MailListProps {
  emails: {
    received: any[]
    sent: any[]
  }
  currentUserId: string
  userEmail:string | null | undefined
}

export default function MailPage({ emails, currentUserId ,userEmail}: MailListProps) {
  const [isComposing, setIsComposing] = useState(true)
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null)

  // Count emails in each folder
  const inboxCount = emails.received.length
  const sentItemsCount = emails.sent.length
  const draftsCount = 0  // Assuming 1 draft is available for now
  const junkCount = 0   // Set it dynamically if needed
  const deletedItemsCount = 0  // Same as junkCount
  const outboxCount = 0  // Same as junkCount

  return (
    <div className="flex w-full">
      <AppSidebar />
      <div className="flex h-screen flex-col flex-1">
        <div className="w-full flex flex-col mb-2">
          <AppHeader />
          <MailToolbar onNewMail={() => setIsComposing(true)} />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <MailSidebar 
            inboxCount={inboxCount} 
            sentItemsCount={sentItemsCount}
            draftsCount={draftsCount}
            junkCount={junkCount}
            deletedItemsCount={deletedItemsCount}
            outboxCount={outboxCount}
            userEmail={userEmail}
          />

          <div className="flex flex-1">
            <div className="w-[560px] border-r">
              <div className="h-[calc(100vh-6.5rem)] bg-gray-100 p-3">
                <div className="bg-white h-full flex flex-col">
                  <MailList
                    emails={emails}
                    onEmailSelect={(email) => {
                      setSelectedEmail(email)
                      setIsComposing(false)
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="h-[calc(100vh-6.5rem)] bg-gray-100 p-3">
                <div className="w-[480px] h-full">
                  {isComposing ? (
                    <EmailComposer
                      currentUserId={currentUserId}
                      onClose={() => setIsComposing(false)}
                      onEmailSent={() => {
                        setIsComposing(false)
                      }}
                    />
                  ) : (
                    <MailPreview email={selectedEmail} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
