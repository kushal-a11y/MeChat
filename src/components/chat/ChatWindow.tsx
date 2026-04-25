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
} from "lucide-react";
import type { Chat, Message } from "@/lib/mock-data";
import { aiSuggestionsByTone } from "@/lib/mock-data";
import { MessageBubble } from "./MessageBubble";

interface Props {
  chat: Chat;
  messages: Message[];
  onSend: (text: string) => void;
  onAutoGenerate: () => void;
}

export function ChatWindow({ chat, messages, onSend, onAutoGenerate }: Props) {
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
    <section className="flex h-full min-w-0 flex-1 flex-col bg-background/40 backdrop-blur-sm">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border bg-background/60 px-5 py-3.5 backdrop-blur-xl">
        <div className="relative">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">
            {chat.avatar}
          </div>
          {chat.online && (
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-bold">{chat.name}</h2>
          <p className="text-[11px] text-muted-foreground">
            {chat.online ? "Active now" : `Last seen ${chat.lastSeen} ago`} · Tone: {chat.tone}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {[Phone, Video, MoreVertical].map((Icon, i) => (
            <button
              key={i}
              className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="h-4.5 w-4.5" />
            </button>
          ))}
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-6">
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
      <div className="flex gap-2 overflow-x-auto px-5 pb-2">
        {quickReplies.map((q, i) => (
          <button
            key={i}
            onClick={() => onSend(q)}
            className="shrink-0 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary hover:text-foreground"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Composer */}
      <div className="border-t border-border bg-background/60 p-4 backdrop-blur-xl">
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-card px-3 py-2 focus-within:border-primary focus-within:shadow-glow">
          <button
            onClick={onAutoGenerate}
            title="Auto-generate reply"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-ai text-ai-foreground shadow-violet transition-transform hover:scale-105"
          >
            <Sparkles className="h-4 w-4" strokeWidth={2.5} />
          </button>
          <button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:text-foreground">
            <Paperclip className="h-4.5 w-4.5" />
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
            placeholder={`Message ${chat.name}…`}
            className="max-h-32 min-h-9 flex-1 resize-none bg-transparent px-1 py-2 text-sm leading-relaxed placeholder:text-muted-foreground focus:outline-none"
          />
          <button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:text-foreground">
            <Smile className="h-4.5 w-4.5" />
          </button>
          {draft.trim() ? (
            <button
              onClick={handleSend}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              <Send className="h-4 w-4" strokeWidth={2.5} />
            </button>
          ) : (
            <button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:text-foreground">
              <Mic className="h-4.5 w-4.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
