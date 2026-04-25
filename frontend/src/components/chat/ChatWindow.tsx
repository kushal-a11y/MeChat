import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  Sparkles,
  Mic,
  ArrowLeft,
  MessageSquare,
  Search,
} from "lucide-react";
import type { Chat, Message } from "@/lib/mock-data";
import { aiSuggestionsByTone } from "@/lib/mock-data";
import { MessageBubble } from "./MessageBubble";
import { cn } from "@/lib/utils";

interface Props {
  chat: Chat;
  messages: Message[];
  onSend: (text: string) => void;
  onAutoGenerate: () => void;
  onBack?: () => void;
  onToggleAIDashboard: () => void;
  isAIDashboardOpen: boolean;
}

export function ChatWindow({
  chat,
  messages,
  onSend,
  onAutoGenerate,
  onBack,
  onToggleAIDashboard,
  isAIDashboardOpen,
}: Props) {
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const quickReplies = aiSuggestionsByTone[chat.tone].slice(0, 3);

  const handleSend = () => {
    if (!draft.trim()) return;
    onSend(draft);
    setDraft("");
  };

  return (
    <section className="chat-doodle flex h-full min-w-0 flex-1 flex-col">
      {/* Header — WhatsApp style flat panel */}
      <header className="flex items-center gap-2 border-b border-border bg-panel px-3 py-2.5 sm:px-4">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Back to chats"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <div className="relative shrink-0">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">
            {chat.avatar}
          </div>
          {chat.online && (
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-panel bg-primary" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[15px] font-semibold">{chat.name}</h2>
          <p className="truncate text-[11px] text-muted-foreground">
            {chat.online ? "online" : `last seen ${chat.lastSeen} ago`}
            {chat.autoReply && <span className="ml-1.5 text-accent">· AI auto-reply on</span>}
          </p>
        </div>
        <div className="flex items-center gap-0.5 text-muted-foreground">
          <button
            onClick={onToggleAIDashboard}
            aria-label="Open AI dashboard"
            aria-pressed={isAIDashboardOpen}
            className={cn(
              "relative grid h-10 w-10 place-items-center rounded-full transition-all",
              isAIDashboardOpen
                ? "bg-gradient-ai text-ai-foreground shadow-violet"
                : "hover:bg-muted hover:text-foreground",
            )}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-accent ring-2 ring-panel">
              <Sparkles className="h-2 w-2 text-accent-foreground" strokeWidth={3} />
            </span>
          </button>
          <button
            aria-label="Search"
            className="hidden h-10 w-10 place-items-center rounded-full hover:bg-muted hover:text-foreground sm:grid"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label="Voice call"
            className="hidden h-10 w-10 place-items-center rounded-full hover:bg-muted hover:text-foreground sm:grid"
          >
            <Phone className="h-5 w-5" />
          </button>
          <button
            aria-label="Video call"
            className="hidden h-10 w-10 place-items-center rounded-full hover:bg-muted hover:text-foreground md:grid"
          >
            <Video className="h-5 w-5" />
          </button>
          <button
            aria-label="More"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted hover:text-foreground"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto px-3 py-4 sm:px-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mt-4 text-base font-semibold">Start the conversation</h3>
            <p className="mt-1 max-w-xs text-xs text-muted-foreground">
              Type a message or let MeChat auto-generate one in your voice.
            </p>
          </div>
        ) : (
          messages.map((m) => <MessageBubble key={m.id} msg={m} />)
        )}
      </div>

      {/* Quick replies */}
      <div className="flex gap-2 overflow-x-auto px-3 pb-2 sm:px-6">
        {quickReplies.map((q, i) => (
          <button
            key={i}
            onClick={() => onSend(q)}
            className="shrink-0 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-all hover:border-primary hover:text-foreground"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Composer */}
      <div className="border-t border-border bg-panel px-2 py-2 sm:px-4 sm:py-3">
        <div className="flex items-end gap-1.5 sm:gap-2">
          <button
            onClick={onAutoGenerate}
            title="Auto-generate reply"
            aria-label="Auto-generate reply"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-ai text-ai-foreground shadow-violet transition-transform hover:scale-105"
          >
            <Sparkles className="h-4 w-4" strokeWidth={2.5} />
          </button>
          <div className="flex flex-1 items-end gap-1 rounded-full bg-card px-3 py-1.5">
            <button
              aria-label="Emoji"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:text-foreground"
            >
              <Smile className="h-5 w-5" />
            </button>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={1}
              placeholder="Type a message"
              className="max-h-32 min-h-8 flex-1 resize-none bg-transparent px-1 py-1.5 text-sm leading-relaxed placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              aria-label="Attach"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:text-foreground"
            >
              <Paperclip className="h-5 w-5" />
            </button>
          </div>
          {draft.trim() ? (
            <button
              onClick={handleSend}
              aria-label="Send"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              <Send className="h-4 w-4" strokeWidth={2.5} />
            </button>
          ) : (
            <button
              aria-label="Voice message"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              <Mic className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
