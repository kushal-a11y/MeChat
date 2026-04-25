import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sidebar } from "@/components/chat/Sidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { AIPanel } from "@/components/chat/AIPanel";
import {
  chats as initialChats,
  initialMessages,
  aiSuggestionsByTone,
  type Chat,
  type Message,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MeChat — AI-Personalized Messaging" },
      {
        name: "description",
        content:
          "MeChat is a modern AI chat app that auto-generates replies, schedules messages, and responds in your voice.",
      },
      { property: "og:title", content: "MeChat — AI-Personalized Messaging" },
      {
        property: "og:description",
        content:
          "Auto-generate, schedule, and auto-reply with a personalized AI chat experience.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeId, setActiveId] = useState<string>(chats[0].id);
  const [messagesByChat, setMessagesByChat] =
    useState<Record<string, Message[]>>(initialMessages);
  // mobile view: which pane is visible
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [aiOpen, setAiOpen] = useState(false);

  const activeChat = useMemo(
    () => chats.find((c) => c.id === activeId)!,
    [chats, activeId],
  );
  const activeMessages = messagesByChat[activeId] ?? [];

  const appendMessage = (chatId: string, msg: Message) => {
    setMessagesByChat((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] ?? []), msg],
    }));
  };

  const handleSelectChat = (id: string) => {
    setActiveId(id);
    setMobileView("chat");
  };

  const handleSend = (text: string) => {
    const msg: Message = {
      id: `m-${Date.now()}`,
      chatId: activeId,
      sender: "me",
      content: text,
      timestamp: new Date(),
      status: "sent",
    };
    appendMessage(activeId, msg);

    if (activeChat.autoReply) {
      setTimeout(() => {
        const pool = aiSuggestionsByTone[activeChat.tone];
        const reply = pool[Math.floor(Math.random() * pool.length)];
        appendMessage(activeId, {
          id: `m-${Date.now() + 1}`,
          chatId: activeId,
          sender: "them",
          content: reply,
          timestamp: new Date(),
        });
      }, 1400);
    }
  };

  const handleAutoGenerate = () => {
    const pool = aiSuggestionsByTone[activeChat.tone];
    const text = pool[Math.floor(Math.random() * pool.length)];
    appendMessage(activeId, {
      id: `m-${Date.now()}`,
      chatId: activeId,
      sender: "ai",
      content: text,
      timestamp: new Date(),
    });
  };

  const handleUseSuggestion = (text: string) => {
    handleSend(text);
    setAiOpen(false);
  };

  const handleSchedule = (text: string, when: Date) => {
    appendMessage(activeId, {
      id: `m-${Date.now()}`,
      chatId: activeId,
      sender: "me",
      content: text,
      timestamp: new Date(),
      status: "scheduled",
      scheduledFor: when,
    });
  };

  const handleToggleAutoReply = () => {
    setChats((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, autoReply: !c.autoReply } : c)),
    );
  };

  return (
    <div className="relative flex h-[100dvh] w-full overflow-hidden">
      {/* Sidebar — full width on mobile when in list view, fixed width on md+ */}
      <Sidebar
        chats={chats}
        activeId={activeId}
        onSelect={handleSelectChat}
        className={cn(mobileView === "chat" ? "hidden md:flex" : "flex")}
      />
      {/* Chat window — hidden on mobile when list visible */}
      <div
        className={cn(
          "min-w-0 flex-1",
          mobileView === "list" ? "hidden md:flex" : "flex",
        )}
      >
        <ChatWindow
          key={activeChat.id}
          chat={activeChat}
          messages={activeMessages}
          onSend={handleSend}
          onAutoGenerate={handleAutoGenerate}
          onBack={() => setMobileView("list")}
          onToggleAIDashboard={() => setAiOpen((v) => !v)}
          isAIDashboardOpen={aiOpen}
        />
      </div>
      <AIPanel
        chat={activeChat}
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        onUseSuggestion={handleUseSuggestion}
        onSchedule={handleSchedule}
        onToggleAutoReply={handleToggleAutoReply}
      />
    </div>
  );
}
