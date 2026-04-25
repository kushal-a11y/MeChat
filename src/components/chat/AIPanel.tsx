import { useState } from "react";
import { Sparkles, Wand2, Send, RefreshCw, Calendar, Bot, Check, X } from "lucide-react";
import type { Chat } from "@/lib/mock-data";
import { aiSuggestionsByTone } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface Props {
  chat: Chat;
  open: boolean;
  onClose: () => void;
  onUseSuggestion: (text: string) => void;
  onSchedule: (text: string, when: Date) => void;
  onToggleAutoReply: () => void;
}

const tones: Chat["tone"][] = ["Friendly", "Professional", "Witty", "Romantic"];

export function AIPanel({ chat, open, onClose, onUseSuggestion, onSchedule, onToggleAutoReply }: Props) {
  const [tone, setTone] = useState<Chat["tone"]>(chat.tone);
  const [scheduleText, setScheduleText] = useState("");
  const [scheduleTime, setScheduleTime] = useState(() => {
    const d = new Date(Date.now() + 1000 * 60 * 60);
    return d.toISOString().slice(0, 16);
  });
  const [refreshKey, setRefreshKey] = useState(0);

  const suggestions = aiSuggestionsByTone[tone];
  // shuffle slightly based on refresh
  const visible = [...suggestions].slice(refreshKey % suggestions.length).concat(
    [...suggestions].slice(0, refreshKey % suggestions.length),
  );

  const handleSchedule = () => {
    if (!scheduleText.trim()) return;
    onSchedule(scheduleText, new Date(scheduleTime));
    setScheduleText("");
  };

  if (!open) return null;

  return (
    <>
      {/* Mobile/tablet overlay backdrop */}
      <button
        aria-label="Close AI dashboard"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
      />
      <aside className="animate-slide-in-right fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-[380px] flex-col border-l border-border bg-card shadow-soft lg:static lg:z-auto lg:w-[340px] lg:max-w-none lg:shadow-none">
        <div className="flex items-center justify-between border-b border-border bg-panel px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-ai shadow-violet">
              <Sparkles className="h-4 w-4 text-ai-foreground" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-sm font-bold">AI Dashboard</h2>
              <p className="text-[11px] text-muted-foreground">Chat with {chat.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-5">
        {/* Auto-Reply */}
        <section>
          <div className="mb-2.5 flex items-center justify-between">
            <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Bot className="h-3.5 w-3.5" /> Auto-Reply
            </h3>
            <button
              onClick={onToggleAutoReply}
              role="switch"
              aria-checked={chat.autoReply}
              className={cn(
                "relative h-5 w-9 rounded-full transition-colors",
                chat.autoReply ? "bg-gradient-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-4 w-4 rounded-full bg-background shadow-soft transition-transform",
                  chat.autoReply ? "translate-x-4" : "translate-x-0.5",
                )}
              />
            </button>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            When you're away, MeChat will reply in your voice using the selected tone.
          </p>
          {chat.autoReply && (
            <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1.5 text-[11px] font-medium text-primary">
              <Check className="h-3 w-3" /> Active · responds within ~30s
            </div>
          )}
        </section>

        {/* Tone selector */}
        <section>
          <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Voice & Tone
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {tones.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-xs font-semibold transition-all",
                  tone === t
                    ? "border-primary bg-primary/15 text-primary shadow-glow"
                    : "border-border bg-card text-foreground hover:border-primary/50",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        {/* Auto-generated suggestions */}
        <section>
          <div className="mb-2.5 flex items-center justify-between">
            <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Wand2 className="h-3.5 w-3.5" /> Smart Replies
            </h3>
            <button
              onClick={() => setRefreshKey((k) => k + 1)}
              className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Refresh suggestions"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-2">
            {visible.map((s, i) => (
              <button
                key={`${refreshKey}-${i}`}
                onClick={() => onUseSuggestion(s)}
                className="group flex w-full items-start gap-2 rounded-xl border border-border bg-card/60 p-3 text-left text-xs leading-relaxed transition-all hover:border-accent hover:bg-accent/5"
              >
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <span className="flex-1">{s}</span>
                <Send className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </section>

        {/* Schedule message */}
        <section>
          <h3 className="mb-2.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" /> Schedule a Message
          </h3>
          <div className="space-y-2 rounded-xl border border-border bg-card/60 p-3">
            <textarea
              value={scheduleText}
              onChange={(e) => setScheduleText(e.target.value)}
              placeholder="What should we send?"
              rows={3}
              className="w-full resize-none rounded-lg border border-border bg-background/60 px-3 py-2 text-xs leading-relaxed placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <input
              type="datetime-local"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-xs focus:border-primary focus:outline-none"
            />
            <button
              onClick={handleSchedule}
              disabled={!scheduleText.trim()}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-ai px-3 py-2 text-xs font-semibold text-ai-foreground shadow-violet transition-transform hover:scale-[1.01] disabled:opacity-40 disabled:hover:scale-100"
            >
              <Calendar className="h-3.5 w-3.5" />
              Schedule Send
            </button>
          </div>
        </section>
      </div>
      </aside>
    </>
  );
}
