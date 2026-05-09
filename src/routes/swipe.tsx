import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useMemo, useState } from "react";
import { BadgeCheck, ChevronUp, Clock, Flame, Heart, MapPin, Sparkles, Star, Users, X } from "lucide-react";
import { AppShell } from "@/components/jelly/AppShell";
import { restaurants, type Restaurant } from "@/data/restaurants";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/swipe")({
  component: SwipePage,
  head: () => ({
    meta: [
      { title: "Swipe — JellyBelly" },
      { name: "description", content: "Swipe through restaurants near you. Right to taste, left to pass." },
    ],
  }),
});

function SwipePage() {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState<Restaurant[]>([]);
  const [detail, setDetail] = useState<Restaurant | null>(null);

  const visible = useMemo(() => restaurants.slice(index, index + 3).reverse(), [index]);

  const advance = (dir: "left" | "right", r: Restaurant) => {
    if (dir === "right") setLiked((l) => [r, ...l].slice(0, 5));
    setIndex((i) => i + 1);
  };

  const reset = () => {
    setIndex(0);
    setLiked([]);
  };

  return (
    <AppShell>
      <div className="max-w-md mx-auto px-6">
        <header className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Tonight · {liked.length}/{restaurants.length} stacked</p>
          <h1 className="font-display text-3xl font-bold">Pick your vibe.</h1>
          <p className="text-sm text-muted-foreground mt-2">Right = taste · Left = pass · Up = details</p>
        </header>

        <div className="relative h-[560px] mx-auto">
          <AnimatePresence>
            {visible.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 glass-strong rounded-3xl flex flex-col items-center justify-center text-center p-8"
              >
                <Sparkles className="text-primary mb-3" />
                <h2 className="font-display text-2xl font-semibold">That's the deck.</h2>
                <p className="text-sm text-muted-foreground mt-2 mb-6">
                  You liked {liked.length} {liked.length === 1 ? "spot" : "spots"} tonight.
                </p>
                <button
                  onClick={reset}
                  className="px-5 py-2.5 rounded-full bg-aurora text-primary-foreground text-sm font-medium shadow-[var(--shadow-glow)]"
                >
                  Reshuffle
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {visible.map((r, i) => (
            <SwipeCard
              key={r.id}
              r={r}
              depth={visible.length - 1 - i}
              onSwipe={(d) => advance(d, r)}
              onOpen={() => setDetail(r)}
            />
          ))}
        </div>

        {visible.length > 0 && (
          <div className="mt-6 flex justify-center gap-4">
            <ActionButton variant="pass" onClick={() => visible[visible.length - 1] && advance("left", visible[visible.length - 1])}>
              <X size={22} />
            </ActionButton>
            <ActionButton variant="like" onClick={() => visible[visible.length - 1] && advance("right", visible[visible.length - 1])}>
              <Heart size={22} />
            </ActionButton>
          </div>
        )}

        {liked.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Your stack</p>
              <Link to="/stack" className="text-xs text-primary">Review →</Link>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {liked.map((r) => (
                <div key={r.id} className="flex items-center gap-2 glass rounded-full pl-1 pr-3 py-1 shrink-0">
                  <img src={r.image} alt="" className="size-7 rounded-full object-cover" />
                  <span className="text-xs">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>{detail && <DetailSheet r={detail} onClose={() => setDetail(null)} />}</AnimatePresence>
    </AppShell>
  );
}

function SwipeCard({ r, depth, onSwipe, onOpen }: { r: Restaurant; depth: number; onSwipe: (dir: "left" | "right") => void; onOpen: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-18, 18]);
  const likeOpacity = useTransform(x, [40, 140], [0, 1]);
  const passOpacity = useTransform(x, [-140, -40], [1, 0]);
  const detailOpacity = useTransform(y, [-140, -40], [1, 0]);
  const top = depth === 0;
  const friendCount = (r.id.charCodeAt(0) % 3) + 1;
  const crowd = ["Quiet", "Buzzing", "Packed"][r.id.charCodeAt(1) % 3];
  const wait = (r.id.charCodeAt(2) % 4) * 10 + 5;

  return (
    <motion.article
      drag={top ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      style={{ x: top ? x : 0, y: top ? y : 0, rotate: top ? rotate : 0, zIndex: 10 - depth }}
      initial={{ scale: 1 - depth * 0.05, opacity: 1 }}
      animate={{ scale: 1 - depth * 0.05, opacity: 1 }}
      exit={{ x: x.get() > 0 ? 600 : x.get() < 0 ? -600 : 0, y: y.get() < -100 ? -800 : 0, opacity: 0, transition: { duration: 0.3 } }}
      onDragEnd={(_, info) => {
        if (info.offset.y < -120) onOpen();
        else if (info.offset.x > 120) onSwipe("right");
        else if (info.offset.x < -120) onSwipe("left");
      }}
      className="absolute inset-0 rounded-[2rem] overflow-hidden glass-strong shadow-[var(--shadow-card)] cursor-grab active:cursor-grabbing"
    >
      <img src={r.image} alt={r.name} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

      {top && (
        <>
          <motion.div style={{ opacity: likeOpacity }} className="absolute top-6 right-6 px-3 py-1.5 rounded-full border-2 border-primary text-primary font-display font-bold tracking-wider rotate-12">
            TASTE
          </motion.div>
          <motion.div style={{ opacity: passOpacity }} className="absolute top-6 left-6 px-3 py-1.5 rounded-full border-2 border-destructive text-destructive font-display font-bold tracking-wider -rotate-12">
            PASS
          </motion.div>
          <motion.div style={{ opacity: detailOpacity }} className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full glass-strong border border-primary/40 flex items-center gap-1 text-xs text-primary">
            <ChevronUp size={12} /> DETAILS
          </motion.div>
        </>
      )}

      {/* badges */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none">
        <span className="px-2 py-1 rounded-full glass-strong text-[10px] uppercase tracking-wider flex items-center gap-1 text-primary">
          <BadgeCheck size={11} /> Verified
        </span>
        <span className="px-2 py-1 rounded-full glass-strong text-[10px] uppercase tracking-wider flex items-center gap-1">
          <Flame size={11} className="text-secondary" /> {crowd}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">{r.cuisine}</span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Star size={12} className="fill-primary text-primary" />
            {r.rating}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <MapPin size={12} /> {r.distanceKm} km
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock size={12} /> {wait}m
          </span>
        </div>
        <h2 className="font-display text-3xl font-bold leading-tight">{r.name}</h2>
        <div className="flex flex-wrap gap-1.5">
          {r.vibe.map((v) => (
            <span key={v} className="text-[11px] px-2 py-0.5 rounded-full glass">{v}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Users size={12} /> {friendCount} friend{friendCount === 1 ? "" : "s"} ate here
          </span>
          <span className="text-sm font-medium text-aurora">~{r.solPrice} SOL</span>
        </div>
      </div>
    </motion.article>
  );
}

function DetailSheet({ r, onClose }: { r: Restaurant; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-md flex items-end sm:items-center justify-center p-3"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md glass-strong rounded-[2rem] overflow-hidden shadow-[var(--shadow-card)] max-h-[88vh] overflow-y-auto"
      >
        <div className="relative h-56">
          <img src={r.image} alt={r.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <button onClick={onClose} className="absolute top-3 right-3 size-9 rounded-full glass-strong flex items-center justify-center">
            <X size={16} />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-[11px] uppercase tracking-wider text-primary">{r.cuisine}</p>
            <h2 className="font-display text-3xl font-bold">{r.name}</h2>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <div className="grid grid-cols-3 gap-2 text-center">
            <Mini label="Rating" value={`★ ${r.rating}`} />
            <Mini label="Distance" value={`${r.distanceKm} km`} />
            <Mini label="Avg" value={`${r.solPrice} SOL`} />
          </div>

          {/* mini map */}
          <div className="relative h-32 rounded-2xl overflow-hidden glass">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, oklch(0.86 0.18 200 / 0.25), transparent 60%)" }} />
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(oklch(0.86 0.18 200 / 0.4) 1px, transparent 1px), linear-gradient(90deg, oklch(0.86 0.18 200 / 0.4) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-4 rounded-full bg-aurora animate-pulse-glow" />
          </div>

          <section>
            <h3 className="font-semibold mb-2">Tonight's menu</h3>
            <ul className="space-y-2 text-sm">
              {[
                { n: "Chef's omakase · 9 courses", p: "1.8 SOL" },
                { n: "Toro flight", p: "0.45 SOL" },
                { n: "Yuzu mochi", p: "0.12 SOL" },
              ].map((m) => (
                <li key={m.n} className="flex justify-between text-muted-foreground">
                  <span>{m.n}</span>
                  <span className="text-aurora">{m.p}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-2">Verified reviews</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="glass rounded-xl p-3">"The uni course alone is worth the trip." — <span className="text-primary">@ramen_jay · ★ 5</span></p>
              <p className="glass rounded-xl p-3">"Quiet, intimate, and the chef remembers your name." — <span className="text-primary">@sarahko · ★ 5</span></p>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-2">
            <button className="h-12 rounded-2xl bg-aurora text-primary-foreground text-sm font-semibold shadow-[var(--shadow-glow)]">Reserve table</button>
            <button className="h-12 rounded-2xl glass text-sm font-medium">Order now</button>
            <button className="h-12 rounded-2xl glass text-sm font-medium">Save</button>
            <button className="h-12 rounded-2xl glass text-sm font-medium">Share</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl py-2.5">
      <p className="font-display font-bold">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

function ActionButton({
  variant,
  children,
  onClick,
}: {
  variant: "pass" | "like";
  children: React.ReactNode;
  onClick: () => void;
}) {
  const styles =
    variant === "like"
      ? "bg-aurora text-primary-foreground shadow-[var(--shadow-glow)]"
      : "glass-strong text-muted-foreground hover:text-destructive";
  return (
    <button onClick={onClick} className={`size-14 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ${styles}`}>
      {children}
    </button>
  );
}