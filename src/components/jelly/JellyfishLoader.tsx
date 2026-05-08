import { motion } from "framer-motion";

export function JellyfishLoader({ size = 96 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size * 1.4 }} aria-label="Loading">
      <motion.div
        className="absolute inset-x-0 top-0 rounded-full bg-aurora opacity-90 blur-[2px]"
        style={{ height: size * 0.6 }}
        animate={{ scaleY: [1, 0.85, 1], scaleX: [1, 1.08, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 top-0 rounded-full neon-border" style={{ height: size * 0.6 }} />
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-1" style={{ top: size * 0.55 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="block w-[2px] rounded-full bg-aurora"
            style={{ height: size * 0.7 }}
            animate={{ scaleY: [1, 0.7, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
          />
        ))}
      </div>
    </div>
  );
}