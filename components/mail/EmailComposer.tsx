"use client"

import type React from "react"
import { useState } from "react"
import {
  X,
  Send,
  Paperclip,
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  UnderlineIcon,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import { sendEmail } from "@/actions/email"
import toast from "react-hot-toast"
import { ScrollArea } from "../ui/scroll-area"

interface EmailComposerProps {
  onClose: () => void
  currentUserId: string
  onEmailSent?: () => void
}

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null
  }

  return (
    <div className="border-b p-2 flex gap-1 flex-wrap">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-gray-200" : ""}
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-gray-200" : ""}
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "bg-gray-200" : ""}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>

      <div className="h-6 w-px bg-gray-300 mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""}
      >
        <AlignRight className="h-4 w-4" />
      </Button>

      <div className="h-6 w-px bg-gray-300 mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default function EmailComposer({ currentUserId, onClose, onEmailSent }: EmailComposerProps) {
  const [to, setTo] = useState("")
  const [subject, setSubject] = useState("")
  const [isSending, setIsSending] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[200px]",
      },
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editor?.getHTML()) {
      toast.error("Please enter some content")
      return
    }

    setIsSending(true)

    try {
      const result = await sendEmail({
        to,
        subject,
        content: editor.getHTML(),
        fromId: currentUserId,
      })

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Email sent successfully")
        onEmailSent?.()
        // onClose()
      }
    } catch (error) {
      toast.error("Failed to send email")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <ScrollArea className="bg-white rounded-lg shadow-lg h-full flex flex-col ">
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">New Message</h2>
        <div className="flex gap-2">
          <Button type="button" className="gap-2" disabled={isSending} onClick={handleSubmit}>
            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {isSending ? "Sending..." : "Send"}
          </Button>
          <Button type="button" variant="outline" className="gap-2">
            <Paperclip className="h-4 w-4" />
            Attach
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <form className="flex-1 flex flex-col">
        {/* Recipients and Subject */}
        <div className="px-4 space-y-1 border-b">
          <div className="flex items-center py-2 border-b">
            <span className="w-16 text-sm text-gray-600">To:</span>
            <Input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              className="border-0 focus:ring-0 px-2 focus:outline-none"
              placeholder="Recipients"
            />
          </div>

          <div className="flex items-center py-2">
            <span className="w-16 text-sm text-gray-600">Subject:</span>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="border-0 focus:ring-0 px-2 focus:outline-none"
              placeholder="Add a subject"
            />
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <MenuBar editor={editor} />
          <div  className="flex-1 p-4 overflow-auto">
            <EditorContent editor={editor} className="h-full" />
          </div>
        </div>
      </form>
    </ScrollArea>
  )
}

