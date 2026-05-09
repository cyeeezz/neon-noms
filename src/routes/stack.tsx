import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bookmark, MapPin, Share2, Split, Star, Wallet } from "lucide-react";
import { AppShell } from "@/components/jelly/AppShell";
import { restaurants } from "@/data/restaurants";

export const Route = createFileRoute("/stack")({
  component: StackSummary,
  head: () => ({ meta: [{ title: "Your stack — JellyBelly" }, { name: "description", content: "Compare and finalize your dining stack." }] }),
});

function StackSummary() {
  const stack = restaurants.slice(0, 3);
  return (
    <AppShell>
      <div className="max-w-md mx-auto px-5 space-y-5">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Your stack</p>
          <h1 className="font-display text-3xl font-bold mt-1">3 spots tonight.</h1>
          <p className="text-sm text-muted-foreground mt-2">Match score 94% · 0.4–1.5 km away</p>
        </header>

        <div className="space-y-3">
          {stack.map((r, i) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass-strong rounded-3xl p-3 flex gap-3 items-center"
            >
              <div className="relative">
                <img src={r.image} alt="" className="size-20 rounded-2xl object-cover" />
                <span className="absolute -top-1 -left-1 size-6 rounded-full bg-aurora text-primary-foreground text-[11px] font-bold flex items-center justify-center shadow-[var(--shadow-glow)]">
                  {i + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-primary">{r.cuisine}</p>
                <h2 className="font-display font-bold leading-tight truncate">{r.name}</h2>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><Star size={11} className="fill-primary text-primary" />{r.rating}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} />{r.distanceKm} km</span>
                  <span className="text-aurora">{r.solPrice} SOL</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase text-muted-foreground">Wait</p>
                <p className="text-sm font-semibold">{15 + i * 10}m</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Action icon={Wallet} label="Reserve top pick" primary />
          <Action icon={Split} label="Split bill" />
          <Action icon={Bookmark} label="Save stack" />
          <Action icon={Share2} label="Share with friends" />
        </div>

        <Link to="/swipe" className="block text-center text-xs text-muted-foreground hover:text-foreground">
          ← Keep swiping
        </Link>
      </div>
    </AppShell>
  );
}

function Action({ icon: Icon, label, primary }: { icon: any; label: string; primary?: boolean }) {
  return (
    <button className={`h-14 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium transition-all hover:scale-[1.02] ${
      primary ? "bg-aurora text-primary-foreground shadow-[var(--shadow-glow)]" : "glass-strong text-foreground"
    }`}>
      <Icon size={15} /> {label}
    </button>
  );
}