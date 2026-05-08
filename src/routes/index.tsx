import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Map as MapIcon, Sparkles, Users, Wallet, Zap } from "lucide-react";
import { NavBar } from "@/components/jelly/NavBar";
import { JellyfishLoader } from "@/components/jelly/JellyfishLoader";
import heroJelly from "@/assets/hero-jelly.jpg";
import { restaurants } from "@/data/restaurants";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "JellyBelly — Swipe. Eat. Verified." },
      {
        name: "description",
        content:
          "Premium Web3 social dining. Swipe to discover restaurants, dine with friends, pay on-chain with Solana.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <NavBar />
      <Hero />
      <Features />
      <PreviewStrip />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center px-6 pt-24">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroJelly}
          alt=""
          width={1536}
          height={1024}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
      </div>

      {/* drifting jellies */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute size-72 rounded-full bg-aurora opacity-20 blur-3xl animate-drift" style={{ top: "10%", left: "8%" }} />
        <div className="absolute size-96 rounded-full bg-secondary opacity-20 blur-3xl animate-drift" style={{ top: "55%", right: "5%", animationDelay: "3s" }} />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8"
        >
          <Sparkles size={12} className="text-primary" />
          Web3 Social Dining
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display text-[clamp(2.75rem,9vw,6.5rem)] font-bold leading-[0.95] tracking-tight"
        >
          Swipe. <span className="text-aurora">Eat.</span> Verified.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          The neon-lit dining universe. Discover restaurants by feel, match with friends in real-time, and settle the bill on-chain.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <Link
            to="/swipe"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-aurora text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:scale-[1.03] transition-transform"
          >
            Start swiping
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/map"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-strong hover:bg-card transition-colors"
          >
            <MapIcon size={16} /> Explore map
          </Link>
        </motion.div>

        <div className="mt-16 flex justify-center">
          <JellyfishLoader size={64} />
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: Flame, title: "Swipe to taste", desc: "Tinder-fast restaurant discovery powered by your last 50 meals." },
  { icon: Users, title: "Group match", desc: "Spin a room with friends. We surface places everyone will love." },
  { icon: MapIcon, title: "Live underwater map", desc: "See who's eating where — in real time, on a neon city map." },
  { icon: Wallet, title: "Pay in SOL", desc: "Split the bill, tip the chef, mint the night. All on Solana." },
  { icon: Zap, title: "Verified bites", desc: "Every review is wallet-signed by someone who actually ate there." },
  { icon: Sparkles, title: "Earn JELLY", desc: "Show up, leave a verified review, collect rewards. Repeat." },
];

function Features() {
  return (
    <section className="relative px-6 py-32 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Why JellyBelly</p>
        <h2 className="font-display text-4xl sm:text-5xl font-bold">A dining layer for the open internet.</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass rounded-3xl p-6 hover:border-primary/40 transition-colors group"
          >
            <div className="size-11 rounded-2xl bg-aurora/20 border border-primary/30 flex items-center justify-center mb-5 group-hover:bg-aurora group-hover:shadow-[var(--shadow-glow)] transition-all">
              <Icon size={20} className="text-primary group-hover:text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PreviewStrip() {
  return (
    <section className="relative px-6 pb-32">
      <div className="max-w-6xl mx-auto glass-strong rounded-[2rem] overflow-hidden p-8 sm:p-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Tonight near you</p>
            <h3 className="font-display text-3xl sm:text-4xl font-bold">Five places worth swiping right.</h3>
          </div>
          <Link to="/swipe" className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
            Open the deck <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {restaurants.map((r) => (
            <Link
              to="/swipe"
              key={r.id}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-border"
            >
              <img src={r.image} alt={r.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-[11px] text-primary uppercase tracking-wider">{r.cuisine.split("·")[0]}</p>
                <p className="font-display text-sm font-semibold leading-tight">{r.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="size-5 rounded-full bg-aurora" />
          <span className="font-display font-semibold text-foreground">JellyBelly</span>
        </div>
        <p>© 2026 · Swipe. Eat. Verified.</p>
      </div>
    </footer>
  );
}
