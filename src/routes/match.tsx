import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Sparkles, Users } from "lucide-react";
import { AppShell } from "@/components/jelly/AppShell";
import { friends, me } from "@/data/user";

export const Route = createFileRoute("/match")({
  component: MatchSettings,
  head: () => ({ meta: [{ title: "Match — JellyBelly" }, { name: "description", content: "Tune your dining match settings." }] }),
});

const cravings = ["Sushi", "Ramen", "Burgers", "Tacos", "Pizza", "Dim Sum", "Brunch", "Steak"] as const;
const moods = ["Date night", "Quick bite", "Chill solo", "Party", "Work meeting"] as const;

function MatchSettings() {
  const [collab, setCollab] = useState(false);
  const [radius, setRadius] = useState(3);
  const [budget, setBudget] = useState(2);
  const [stack, setStack] = useState(8);
  const [group, setGroup] = useState(2);
  const [picked, setPicked] = useState<string[]>(["Sushi", "Ramen"]);
  const [mood, setMood] = useState<string>("Date night");
  const invited = friends.slice(0, collab ? 3 : 0);

  const toggle = (c: string) =>
    setPicked((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  return (
    <AppShell>
      <div className="max-w-md mx-auto px-5 space-y-5">
        <header className="text-center pt-1">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Tonight's match</p>
          <h1 className="font-display text-3xl font-bold mt-1">Tune your stack.</h1>
          <p className="text-sm text-muted-foreground mt-2">We'll surface places that fit the vibe.</p>
        </header>

        {/* mode toggle */}
        <div className="glass-strong rounded-full p-1 grid grid-cols-2 text-sm">
          <button onClick={() => setCollab(false)} className={`py-2 rounded-full transition-all ${!collab ? "bg-aurora text-primary-foreground shadow-[var(--shadow-glow)]" : "text-muted-foreground"}`}>Solo</button>
          <button onClick={() => setCollab(true)} className={`py-2 rounded-full transition-all ${collab ? "bg-aurora text-primary-foreground shadow-[var(--shadow-glow)]" : "text-muted-foreground"}`}>Collaborate</button>
        </div>

        {/* friends */}
        {collab && (
          <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-wider text-primary flex items-center gap-1.5"><Users size={12} /> Dining room</p>
              <span className="text-[11px] text-muted-foreground">{invited.length} invited</span>
            </div>
            <div className="flex gap-2">
              {invited.map((f) => (
                <div key={f.id} className="relative">
                  <img src={f.avatar} alt="" className="size-10 rounded-full border border-border" />
                  {f.online && <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-primary border-2 border-background" />}
                </div>
              ))}
              <button className="size-10 rounded-full border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary">
                <Plus size={16} />
              </button>
            </div>
          </motion.section>
        )}

        {/* saved prefs */}
        <section className="glass rounded-3xl p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">From your profile</p>
          <div className="flex flex-wrap gap-1.5">
            {[...me.diet, ...me.allergies.map((a) => `No ${a}`), ...me.cuisines].map((p) => (
              <span key={p} className="text-[11px] px-2 py-0.5 rounded-full glass-strong">{p}</span>
            ))}
          </div>
        </section>

        {/* cravings */}
        <section>
          <p className="text-xs uppercase tracking-wider text-primary mb-2">Tonight's cravings</p>
          <div className="flex flex-wrap gap-2">
            {cravings.map((c) => {
              const active = picked.includes(c);
              return (
                <button
                  key={c}
                  onClick={() => toggle(c)}
                  className={`px-3.5 py-1.5 rounded-full text-sm transition-all ${
                    active
                      ? "bg-aurora text-primary-foreground shadow-[var(--shadow-glow)] scale-[1.03]"
                      : "glass text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </section>

        {/* sliders */}
        <section className="glass rounded-3xl p-5 space-y-5">
          <Slider label="Search radius" value={radius} setValue={setRadius} min={1} max={15} unit="km" />
          <Slider label="Budget" value={budget} setValue={setBudget} min={1} max={4} unit="$" symbolic />
          <Slider label="Stack size" value={stack} setValue={setStack} min={3} max={15} unit="cards" />
          {collab && <Slider label="Group size" value={group} setValue={setGroup} min={2} max={8} unit="people" />}
        </section>

        {/* mood */}
        <section>
          <p className="text-xs uppercase tracking-wider text-primary mb-2">Dining mood</p>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  mood === m ? "bg-secondary/30 border border-secondary text-foreground" : "glass text-muted-foreground"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </section>

        <Link
          to="/swipe"
          className="w-full h-14 rounded-2xl bg-aurora text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-[var(--shadow-glow)] hover:scale-[1.01] transition-transform"
        >
          <Sparkles size={16} /> Start matching
        </Link>
      </div>
    </AppShell>
  );
}

function Slider({
  label, value, setValue, min, max, unit, symbolic,
}: { label: string; value: number; setValue: (v: number) => void; min: number; max: number; unit: string; symbolic?: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm">{label}</span>
        <span className="text-sm text-primary font-medium">
          {symbolic ? unit.repeat(value) : `${value} ${unit}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-[oklch(0.86_0.18_200)]"
      />
    </div>
  );
}