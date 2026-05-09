import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Flame, MapPin, Navigation, Star, TrendingUp } from "lucide-react";
import { TopBar, BottomNav } from "@/components/jelly/AppShell";
import { restaurants, type Restaurant } from "@/data/restaurants";
import { friends } from "@/data/user";

export const Route = createFileRoute("/map")({
  component: MapPage,
  head: () => ({
    meta: [
      { title: "Map — JellyBelly" },
      { name: "description", content: "Live neon map of restaurants and friends nearby." },
    ],
  }),
});

function MapPage() {
  const [selected, setSelected] = useState<Restaurant>(restaurants[0]);

  return (
    <div className="min-h-[100svh] relative overflow-hidden">
      <TopBar />
      <BottomNav />

      {/* stylized map canvas */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, oklch(0.86 0.18 200 / 0.18), transparent 55%), radial-gradient(ellipse at 75% 75%, oklch(0.65 0.24 295 / 0.22), transparent 50%), oklch(0.1 0.05 270)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.86 0.18 200 / 0.4) 1px, transparent 1px), linear-gradient(90deg, oklch(0.86 0.18 200 / 0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        {/* fake rivers / paths */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M -5 30 Q 40 50 60 35 T 110 50" stroke="oklch(0.86 0.18 200 / 0.5)" strokeWidth="0.4" fill="none" />
          <path d="M 20 -5 Q 30 40 55 60 T 70 110" stroke="oklch(0.7 0.22 295 / 0.5)" strokeWidth="0.4" fill="none" />
        </svg>
      </div>

      {/* pins */}
      <div className="absolute inset-0 pt-24 pb-48">
        {restaurants.map((r) => {
          const active = selected.id === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setSelected(r)}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${r.x}%`, top: `${r.y}%` }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: r.x / 50 }}
                className="flex flex-col items-center gap-1"
              >
                <div className={`relative rounded-full p-1 ${active ? "bg-aurora animate-pulse-glow" : "glass-strong"}`}>
                  <img src={r.image} alt={r.name} className={`size-12 rounded-full object-cover border-2 ${active ? "border-background" : "border-border"}`} />
                </div>
                <div className="size-2 rounded-full bg-primary shadow-[0_0_10px_oklch(0.86_0.18_200)]" />
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full glass-strong whitespace-nowrap ${active ? "text-primary" : "text-muted-foreground"}`}>
                  {r.name}
                </span>
              </motion.div>
            </button>
          );
        })}

        {/* user location */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 size-5 rounded-full bg-secondary animate-ping opacity-75" />
            <div className="relative size-5 rounded-full bg-secondary border-2 border-background shadow-[0_0_20px_oklch(0.55_0.25_295)]" />
          </div>
        </div>

        {/* friend pins */}
        {friends.filter((f) => f.online).map((f, i) => (
          <motion.div
            key={f.id}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
            className="absolute"
            style={{ left: `${20 + i * 18}%`, top: `${30 + ((i * 11) % 30)}%` }}
          >
            <div className="relative">
              <img src={f.avatar} alt="" className="size-8 rounded-full border-2 border-secondary shadow-[0_0_12px_oklch(0.55_0.25_295)]" />
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-primary border-2 border-background" />
            </div>
          </motion.div>
        ))}

        {/* heat blob */}
        <div className="absolute size-40 rounded-full bg-secondary/30 blur-2xl animate-pulse" style={{ left: "55%", top: "40%" }} />
      </div>

      {/* live activity ticker */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 w-[min(96vw,520px)]">
        <motion.div
          key={friends[0].id}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass rounded-full px-3 py-1.5 flex items-center gap-2 text-xs"
        >
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-muted-foreground truncate">
            <span className="text-foreground font-medium">{friends[0].name}</span> is {friends[0].status}
          </span>
        </motion.div>
      </div>

      {/* recommendations carousel */}
      <div className="fixed bottom-20 left-0 right-0 z-30 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2 px-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary flex items-center gap-1.5">
              <TrendingUp size={11} /> Trending nearby
            </p>
            <span className="text-[11px] text-muted-foreground">{restaurants.length} spots</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory -mx-2 px-2">
            {restaurants.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelected(r)}
                className={`shrink-0 snap-start w-44 glass-strong rounded-2xl overflow-hidden text-left transition-all ${
                  selected.id === r.id ? "ring-2 ring-primary shadow-[var(--shadow-glow)]" : ""
                }`}
              >
                <div className="relative h-24">
                  <img src={r.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <span className="absolute top-2 left-2 text-[9px] uppercase glass-strong px-1.5 py-0.5 rounded-full flex items-center gap-1">
                    <Flame size={9} className="text-secondary" /> Hot
                  </span>
                </div>
                <div className="p-2.5">
                  <p className="text-[9px] uppercase tracking-wider text-primary truncate">{r.cuisine}</p>
                  <p className="font-display text-sm font-semibold truncate">{r.name}</p>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-0.5"><Star size={9} className="fill-primary text-primary" />{r.rating}</span>
                    <span>{r.distanceKm} km</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* detail card (selected) */}
      <motion.div
        key={selected.id}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="hidden"
      >
        <div className="flex gap-4">
          <img src={selected.image} alt={selected.name} className="size-20 rounded-2xl object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-wider text-primary">{selected.cuisine}</p>
            <h2 className="font-display text-xl font-bold leading-tight truncate">{selected.name}</h2>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><Star size={12} className="fill-primary text-primary" />{selected.rating}</span>
              <span className="flex items-center gap-1"><MapPin size={12} />{selected.distanceKm} km</span>
              <span>{"$".repeat(selected.priceLevel)}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {selected.vibe.map((v) => (
                <span key={v} className="text-[10px] px-1.5 py-0.5 rounded-full glass">{v}</span>
              ))}
            </div>
          </div>
          <button className="self-start size-10 shrink-0 rounded-full bg-aurora text-primary-foreground flex items-center justify-center shadow-[var(--shadow-glow)]">
            <Navigation size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}