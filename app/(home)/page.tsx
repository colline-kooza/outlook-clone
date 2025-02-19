// import { getUserEmails } from '@/actions/email'
import { getUserEmails } from '@/actions/email'
import MailPage from '@/components/mail/mail-page'
import { authOptions } from '@/config/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Page() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/login")
  }

  const emails = await getUserEmails(session.user.id)
  const emailData = 
    emails || { received: [], sent: [] };

  return (
    <div>
      <MailPage emails={emailData} currentUserId={session.user.id} userEmail={session.user.email}/>
    </div>
  )
}
