import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Coins, Edit3, Flame, History, Settings, Sparkles, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/jelly/AppShell";
import { me } from "@/data/user";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "Profile — JellyBelly" }, { name: "description", content: "Your JellyBelly dashboard." }] }),
});

function ProfilePage() {
  return (
    <AppShell>
      <div className="max-w-md mx-auto px-5 space-y-5">
        {/* identity */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-5 relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 size-40 bg-aurora opacity-25 blur-3xl rounded-full" />
          <div className="relative flex items-center gap-4">
            <div className="size-16 rounded-2xl overflow-hidden border border-primary/40 animate-pulse-glow">
              <img src={me.avatar} alt="" className="w-full h-full" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] uppercase tracking-wider text-primary">{me.level}</p>
              <h1 className="font-display text-2xl font-bold">{me.name}</h1>
              <p className="text-xs text-muted-foreground">{me.handle}</p>
            </div>
            <button className="size-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground">
              <Edit3 size={15} />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <Stat icon={Coins} label="JELLY" value={me.jelly.toLocaleString()} />
            <Stat icon={Flame} label="Streak" value={`${me.streak}d`} />
            <Stat icon={Award} label="Level" value="L4" />
          </div>
        </motion.section>

        {/* personality */}
        <section className="glass rounded-3xl p-5">
          <p className="text-[11px] uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5"><Sparkles size={11} /> Food personality</p>
          <h2 className="font-display text-xl font-semibold">{me.personality}</h2>
          <p className="text-xs text-muted-foreground mt-1">You crave umami at midnight and never say no to a chef's counter.</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {me.cuisines.map((c) => (
              <span key={c} className="text-[11px] px-2 py-0.5 rounded-full glass-strong">{c}</span>
            ))}
          </div>
        </section>

        {/* earn */}
        <section className="glass-strong rounded-3xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-base font-semibold">Earn JELLY</h3>
            <span className="text-xs text-primary flex items-center gap-1"><TrendingUp size={12} /> +180 this week</span>
          </div>
          <ul className="space-y-2.5 text-sm">
            {[
              { task: "Verify last night's dinner at Neon Noodle", reward: 25 },
              { task: "Invite a friend to your next dining room", reward: 50 },
              { task: "Keep your 12-day streak alive", reward: 15 },
            ].map((t) => (
              <li key={t.task} className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">{t.task}</span>
                <span className="text-primary font-medium shrink-0">+{t.reward}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* actions */}
        <section className="grid grid-cols-2 gap-3">
          <ActionCard icon={History} label="Order history" />
          <ActionCard icon={Settings} label="Preferences" />
        </section>
      </div>
    </AppShell>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="glass rounded-2xl py-3">
      <Icon size={14} className="mx-auto text-primary" />
      <p className="font-display text-lg font-bold mt-1">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

function ActionCard({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="glass rounded-2xl p-4 flex flex-col items-start gap-2 hover:border-primary/40 transition-colors text-left">
      <Icon size={18} className="text-primary" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}