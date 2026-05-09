import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Search, Send } from "lucide-react";
import { AppShell } from "@/components/jelly/AppShell";
import { restaurants } from "@/data/restaurants";
import { messages } from "@/data/user";

export const Route = createFileRoute("/saved")({
  component: SavedPage,
  head: () => ({ meta: [{ title: "Saved & Inbox — JellyBelly" }, { name: "description", content: "Saved restaurants and vendor messages." }] }),
});

function SavedPage() {
  const [tab, setTab] = useState<"saved" | "inbox">("saved");
  return (
    <AppShell>
      <div className="max-w-md mx-auto px-5 space-y-5">
        <div className="glass-strong rounded-full p-1 grid grid-cols-2 text-sm">
          <button onClick={() => setTab("saved")} className={`py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${tab === "saved" ? "bg-aurora text-primary-foreground shadow-[var(--shadow-glow)]" : "text-muted-foreground"}`}>
            <Heart size={13} /> Saved
          </button>
          <button onClick={() => setTab("inbox")} className={`py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${tab === "inbox" ? "bg-aurora text-primary-foreground shadow-[var(--shadow-glow)]" : "text-muted-foreground"}`}>
            <Send size={13} /> Inbox
          </button>
        </div>

        {tab === "saved" ? <SavedList /> : <Inbox />}
      </div>
    </AppShell>
  );
}

function SavedList() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3">
      {restaurants.map((r) => (
        <button key={r.id} className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-strong group text-left">
          <img src={r.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <Heart size={14} className="absolute top-2 right-2 text-primary fill-primary" />
          <div className="absolute inset-x-0 bottom-0 p-3">
            <p className="text-[10px] text-primary uppercase tracking-wider">{r.cuisine.split("·")[0]}</p>
            <p className="font-display text-sm font-semibold leading-tight">{r.name}</p>
          </div>
        </button>
      ))}
    </motion.div>
  );
}

function Inbox() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <div className="relative">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input placeholder="Search vendors" className="w-full h-11 rounded-full glass pl-10 pr-4 text-sm outline-none focus:border-primary/40" />
      </div>
      {messages.map((m) => (
        <article key={m.id} className="glass-strong rounded-2xl p-3 flex gap-3 items-center cursor-pointer hover:bg-card transition-colors">
          <div className="relative">
            <img src={m.avatar} alt="" className="size-12 rounded-2xl bg-card" />
            {m.online && <span className="absolute bottom-0 right-0 size-3 rounded-full bg-primary border-2 border-background" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-semibold text-sm truncate">{m.vendor}</h3>
              <span className="text-[10px] text-muted-foreground shrink-0">{m.time}</span>
            </div>
            <p className="text-xs text-muted-foreground truncate">{m.preview}</p>
          </div>
          {m.unread > 0 && (
            <span className="size-5 rounded-full bg-aurora text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-[var(--shadow-glow)]">
              {m.unread}
            </span>
          )}
        </article>
      ))}
    </motion.div>
  );
}