export type Sender = "me" | "them" | "ai";

export type MessageStatus = "sent" | "scheduled" | "draft";

export interface Message {
  id: string;
  chatId: string;
  sender: Sender;
  content: string;
  timestamp: Date;
  status?: MessageStatus;
  scheduledFor?: Date;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastSeen: string;
  unread: number;
  online: boolean;
  autoReply: boolean;
  tone: "Friendly" | "Professional" | "Witty" | "Romantic";
}

export const chats: Chat[] = [
  {
    id: "1",
    name: "Aria Chen",
    avatar: "AC",
    lastMessage: "See you at 8! Don't be late 😄",
    lastSeen: "2m",
    unread: 2,
    online: true,
    autoReply: true,
    tone: "Friendly",
  },
  {
    id: "2",
    name: "Marcus Rivera",
    avatar: "MR",
    lastMessage: "Sent the deck. Let me know your thoughts.",
    lastSeen: "12m",
    unread: 0,
    online: true,
    autoReply: false,
    tone: "Professional",
  },
  {
    id: "3",
    name: "Studio Group",
    avatar: "SG",
    lastMessage: "Sarah: anyone up for ramen?",
    lastSeen: "1h",
    unread: 5,
    online: false,
    autoReply: false,
    tone: "Witty",
  },
  {
    id: "4",
    name: "Mom",
    avatar: "M",
    lastMessage: "Call me when you can ❤️",
    lastSeen: "3h",
    unread: 1,
    online: false,
    autoReply: true,
    tone: "Friendly",
  },
  {
    id: "5",
    name: "Jordan Wells",
    avatar: "JW",
    lastMessage: "haha ok but seriously",
    lastSeen: "1d",
    unread: 0,
    online: false,
    autoReply: false,
    tone: "Witty",
  },
  {
    id: "6",
    name: "Design Daily",
    avatar: "DD",
    lastMessage: "New Figma file dropped 🔥",
    lastSeen: "2d",
    unread: 0,
    online: false,
    autoReply: false,
    tone: "Professional",
  },
];

export const initialMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      chatId: "1",
      sender: "them",
      content: "Hey! Are we still on for dinner tonight?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "m2",
      chatId: "1",
      sender: "me",
      content: "Absolutely. 8pm at the new ramen place?",
      timestamp: new Date(Date.now() - 1000 * 60 * 28),
      status: "sent",
    },
    {
      id: "m3",
      chatId: "1",
      sender: "them",
      content: "Perfect. I made a reservation under my name.",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
    },
    {
      id: "m4",
      chatId: "1",
      sender: "them",
      content: "See you at 8! Don't be late 😄",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
    },
  ],
  "2": [
    {
      id: "m5",
      chatId: "2",
      sender: "them",
      content: "Sent the deck. Let me know your thoughts.",
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
    },
  ],
  "3": [
    {
      id: "m6",
      chatId: "3",
      sender: "them",
      content: "Sarah: anyone up for ramen?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
  ],
  "4": [
    {
      id: "m7",
      chatId: "4",
      sender: "them",
      content: "Call me when you can ❤️",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
  ],
  "5": [],
  "6": [],
};

export const aiSuggestionsByTone: Record<Chat["tone"], string[]> = {
  Friendly: [
    "Sounds great! Looking forward to it 😊",
    "Totally — let me know if anything changes!",
    "Yes! I'll be there a little early.",
  ],
  Professional: [
    "Thanks for sending it over — I'll review and get back to you by EOD.",
    "Appreciate the update. Let's sync tomorrow morning.",
    "Noted. I'll circulate any feedback shortly.",
  ],
  Witty: [
    "Ramen? In this economy? Obviously yes.",
    "I was born ready. Bring snacks.",
    "Only if there's an emergency exit strategy.",
  ],
  Romantic: [
    "Can't wait to see you ❤️",
    "Counting the minutes until tonight.",
    "You always make my day brighter.",
  ],
};
