export type FriendActivity = {
  id: string;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
};

export const me = {
  name: "Aina K.",
  handle: "@ainak",
  avatar: "https://api.dicebear.com/9.x/glass/svg?seed=aina&backgroundType=gradientLinear",
  jelly: 1248,
  level: "Verified Diner · L4",
  streak: 12,
  personality: "Spicy Explorer",
  cuisines: ["Japanese", "Mexican", "Italian"],
  allergies: ["Peanuts"],
  diet: ["Pescatarian"],
};

export const friends: FriendActivity[] = [
  { id: "1", name: "Jason", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=jason", status: "eating ramen at Neon Noodle", online: true },
  { id: "2", name: "Sarah", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=sarah", status: "matched Kaiyō Omakase", online: true },
  { id: "3", name: "Marcus", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=marcus", status: "earned 25 JELLY", online: false },
  { id: "4", name: "Kira", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=kira", status: "started a dining room", online: true },
];

export type Message = {
  id: string;
  vendor: string;
  avatar: string;
  preview: string;
  time: string;
  unread: number;
  online: boolean;
};

export const messages: Message[] = [
  { id: "kaiyo", vendor: "Kaiyō Omakase", avatar: "https://api.dicebear.com/9.x/shapes/svg?seed=kaiyo", preview: "Your 8pm table is confirmed. See you tonight 🍣", time: "2m", unread: 2, online: true },
  { id: "voltron", vendor: "Voltron Burger Lab", avatar: "https://api.dicebear.com/9.x/shapes/svg?seed=voltron", preview: "Drop by — 20% off truffle smash til 11pm.", time: "1h", unread: 0, online: true },
  { id: "neon", vendor: "Neon Noodle Co.", avatar: "https://api.dicebear.com/9.x/shapes/svg?seed=neon", preview: "Thanks for the verified review! +25 JELLY", time: "3h", unread: 0, online: false },
  { id: "forno", vendor: "Forno Luna", avatar: "https://api.dicebear.com/9.x/shapes/svg?seed=forno", preview: "New seasonal menu just dropped 🌙", time: "1d", unread: 1, online: false },
];