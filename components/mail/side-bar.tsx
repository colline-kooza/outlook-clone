import { Archive, Flag, Inbox, Mail, Send, Star, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={className}>
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="space-y-1 p-2">
          <Button variant="ghost" className="w-full justify-start gap-2 font-medium">
            <Inbox className="h-4 w-4" />
            Inbox
            <span className="ml-auto text-muted-foreground">41</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Star className="h-4 w-4" />
            Favorites
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Send className="h-4 w-4" />
            Sent Items
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Mail className="h-4 w-4" />
            Drafts
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Archive className="h-4 w-4" />
            Archive
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Flag className="h-4 w-4" />
            Flagged
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Trash className="h-4 w-4" />
            Deleted Items
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}

