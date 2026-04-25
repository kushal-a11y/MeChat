import { Search, Sparkles, MoreVertical, MessageSquarePlus, Filter } from "lucide-react";
import type { Chat } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface Props {
  chats: Chat[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function Sidebar({ chats, activeId, onSelect, className }: Props) {
  return (
    <aside
      className={cn(
        "flex h-full w-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:w-[360px] md:shrink-0",
        className,
      )}
    >
      {/* Top bar — WhatsApp style */}
      <div className="flex items-center justify-between bg-panel px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <h1 className="text-base font-bold tracking-tight">
            Me<span className="text-gradient">Chat</span>
          </h1>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <button
            aria-label="New chat"
            className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-sidebar-accent hover:text-foreground"
          >
            <MessageSquarePlus className="h-5 w-5" />
          </button>
          <button
            aria-label="More"
            className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-sidebar-accent hover:text-foreground"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-sidebar px-3 py-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search or start a new chat"
            className="h-10 w-full rounded-full border-0 bg-sidebar-accent/70 pl-10 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            aria-label="Filter"
            className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
          >
            <Filter className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={cn(
              "flex w-full items-center gap-3 border-b border-sidebar-border/40 px-4 py-3 text-left transition-colors",
              activeId === chat.id
                ? "bg-sidebar-accent"
                : "hover:bg-sidebar-accent/60",
            )}
          >
            <div className="relative shrink-0">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
                {chat.avatar}
              </div>
              {chat.online && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-sidebar bg-primary" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[15px] font-semibold">{chat.name}</span>
                <span
                  className={cn(
                    "shrink-0 text-[11px] font-medium",
                    chat.unread > 0 ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {chat.lastSeen}
                </span>
              </div>
              <div className="mt-0.5 flex items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-1.5 truncate text-[13px] text-muted-foreground">
                  {chat.autoReply && (
                    <Sparkles className="h-3 w-3 shrink-0 text-accent" />
                  )}
                  <span className="truncate">{chat.lastMessage}</span>
                </span>
                {chat.unread > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
