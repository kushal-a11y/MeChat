import { Search, Plus, Sparkles, Settings } from "lucide-react";
import type { Chat } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface Props {
  chats: Chat[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function Sidebar({ chats, activeId, onSelect }: Props) {
  return (
    <aside className="flex h-full w-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:w-[340px]">
      {/* Brand */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-4.5 w-4.5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight">
              Me<span className="text-gradient">Chat</span>
            </h1>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              AI · Personalized
            </p>
          </div>
        </div>
        <button className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground">
          <Settings className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Search */}
      <div className="relative px-4 pb-3">
        <Search className="pointer-events-none absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search conversations…"
          className="h-10 rounded-xl border-sidebar-border bg-sidebar-accent/40 pl-10 text-sm placeholder:text-muted-foreground focus-visible:ring-primary"
        />
      </div>

      {/* New chat / AI compose */}
      <div className="px-4 pb-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01] active:scale-[0.99]">
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          New Conversation
        </button>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={cn(
              "group mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
              activeId === chat.id
                ? "bg-sidebar-accent"
                : "hover:bg-sidebar-accent/60",
            )}
          >
            <div className="relative shrink-0">
              <div
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-full text-sm font-semibold",
                  activeId === chat.id
                    ? "bg-gradient-primary text-primary-foreground"
                    : "bg-sidebar-accent text-foreground",
                )}
              >
                {chat.avatar}
              </div>
              {chat.online && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-sidebar bg-primary" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-sm font-semibold">{chat.name}</span>
                <span className="shrink-0 text-[10px] font-medium uppercase text-muted-foreground">
                  {chat.lastSeen}
                </span>
              </div>
              <div className="mt-0.5 flex items-center justify-between gap-2">
                <span className="truncate text-xs text-muted-foreground">
                  {chat.lastMessage}
                </span>
                {chat.unread > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gradient-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                    {chat.unread}
                  </span>
                )}
              </div>
              {chat.autoReply && (
                <div className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-accent/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-accent">
                  <Sparkles className="h-2.5 w-2.5" /> Auto-reply
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 border-t border-sidebar-border px-4 py-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
          YO
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">You</p>
          <p className="truncate text-[11px] text-muted-foreground">Active · AI assist on</p>
        </div>
      </div>
    </aside>
  );
}
