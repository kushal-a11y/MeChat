import { Check, CheckCheck, Clock, Sparkles } from "lucide-react";
import type { Message } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function MessageBubble({ msg }: { msg: Message }) {
  const isMe = msg.sender === "me";
  const isAi = msg.sender === "ai";

  return (
    <div
      className={cn(
        "flex w-full animate-fade-up",
        isMe ? "justify-end" : "justify-start",
      )}
    >
      <div className={cn("flex max-w-[78%] flex-col gap-1", isMe && "items-end")}>
        <div
          className={cn(
            "relative rounded-lg px-3 py-2 text-sm leading-relaxed shadow-soft",
            isMe &&
              "bg-gradient-bubble-me text-bubble-me-foreground rounded-tr-sm",
            !isMe && !isAi && "bg-bubble-them text-bubble-them-foreground rounded-tl-sm",
            isAi &&
              "bg-gradient-ai text-ai-foreground rounded-tl-sm shadow-violet",
          )}
        >
          {isAi && (
            <div className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest opacity-90">
              <Sparkles className="h-3 w-3" /> AI Suggestion
            </div>
          )}
          {msg.content}
        </div>
        <div className="flex items-center gap-1 px-1 text-[10px] font-medium text-muted-foreground">
          {msg.status === "scheduled" && msg.scheduledFor ? (
            <>
              <Clock className="h-3 w-3 text-accent" />
              <span className="text-accent">
                Scheduled · {msg.scheduledFor.toLocaleString([], {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </>
          ) : (
            <>
              <span>{formatTime(msg.timestamp)}</span>
              {isMe && msg.status === "sent" && (
                <CheckCheck className="h-3 w-3 text-primary" />
              )}
              {isMe && msg.status === "draft" && <Check className="h-3 w-3" />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
