import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useMemo, useState } from "react";
import { Heart, MapPin, Sparkles, Star, X } from "lucide-react";
import { NavBar } from "@/components/jelly/NavBar";
import { restaurants, type Restaurant } from "@/data/restaurants";

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
    <div className="min-h-[100svh] pt-28 pb-16 px-6">
      <NavBar />
      <div className="max-w-md mx-auto">
        <header className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Tonight</p>
          <h1 className="font-display text-3xl font-bold">Pick your vibe.</h1>
          <p className="text-sm text-muted-foreground mt-2">Swipe right to save, left to skip.</p>
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
            <SwipeCard key={r.id} r={r} depth={visible.length - 1 - i} onSwipe={(d) => advance(d, r)} />
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
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Your shortlist</p>
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
    </div>
  );
}

function SwipeCard({ r, depth, onSwipe }: { r: Restaurant; depth: number; onSwipe: (dir: "left" | "right") => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-18, 18]);
  const likeOpacity = useTransform(x, [40, 140], [0, 1]);
  const passOpacity = useTransform(x, [-140, -40], [1, 0]);
  const top = depth === 0;

  return (
    <motion.article
      drag={top ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x: top ? x : 0, rotate: top ? rotate : 0, zIndex: 10 - depth }}
      initial={{ scale: 1 - depth * 0.05, y: depth * 12, opacity: 1 }}
      animate={{ scale: 1 - depth * 0.05, y: depth * 12, opacity: 1 }}
      exit={{ x: x.get() > 0 ? 600 : -600, opacity: 0, transition: { duration: 0.3 } }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 120) onSwipe("right");
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
        </>
      )}

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
        </div>
        <h2 className="font-display text-3xl font-bold leading-tight">{r.name}</h2>
        <div className="flex flex-wrap gap-1.5">
          {r.vibe.map((v) => (
            <span key={v} className="text-[11px] px-2 py-0.5 rounded-full glass">{v}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground">{"$".repeat(r.priceLevel)}</span>
          <span className="text-sm font-medium text-aurora">~{r.solPrice} SOL avg</span>
        </div>
      </div>
    </motion.article>
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