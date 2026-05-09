import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Apple, Mail, Wallet } from "lucide-react";
import { JellyfishLoader } from "@/components/jelly/JellyfishLoader";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — JellyBelly" },
      { name: "description", content: "Sign into JellyBelly with wallet, Google, Apple, or email." },
    ],
  }),
});

function LoginPage() {
  return (
    <div className="min-h-[100svh] relative overflow-hidden flex items-center justify-center px-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 20%, oklch(0.86 0.18 200 / 0.25), transparent 55%), radial-gradient(ellipse at 70% 80%, oklch(0.7 0.22 295 / 0.3), transparent 55%)" }} />
        <div className="absolute size-[40rem] rounded-full bg-aurora opacity-25 blur-3xl animate-drift" style={{ top: "20%", left: "10%" }} />
        <div className="absolute size-[32rem] rounded-full bg-secondary opacity-30 blur-3xl animate-drift" style={{ bottom: "10%", right: "5%", animationDelay: "4s" }} />
        {/* particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute size-1 rounded-full bg-primary/60 animate-float"
            style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%`, animationDelay: `${i * 0.4}s`, animationDuration: `${5 + (i % 5)}s` }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm glass-strong rounded-[2rem] p-8 shadow-[var(--shadow-card)]"
      >
        <div className="flex flex-col items-center text-center">
          <JellyfishLoader size={88} />
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary mt-6">JellyBelly</p>
          <h1 className="font-display text-3xl font-bold mt-1">Welcome back.</h1>
          <p className="text-sm text-muted-foreground mt-2">Sign in to start swiping tonight.</p>
        </div>

        <div className="mt-8 space-y-2.5">
          <AuthButton variant="primary" icon={<Wallet size={16} />} label="Continue with Wallet" />
          <AuthButton icon={<GoogleIcon />} label="Continue with Google" />
          <AuthButton icon={<Apple size={16} />} label="Continue with Apple" />
          <AuthButton icon={<Mail size={16} />} label="Continue with Email" />
        </div>

        <p className="text-[11px] text-center text-muted-foreground mt-6 leading-relaxed">
          By continuing you accept our terms. JELLY is for tasting, not for trading.
        </p>

        <div className="mt-6 flex justify-center">
          <Link to="/map" className="text-xs text-primary hover:underline">Skip — explore as guest →</Link>
        </div>
      </motion.div>
    </div>
  );
}

function AuthButton({ icon, label, variant }: { icon: React.ReactNode; label: string; variant?: "primary" }) {
  const cls =
    variant === "primary"
      ? "bg-aurora text-primary-foreground shadow-[var(--shadow-glow)]"
      : "glass hover:bg-card text-foreground";
  return (
    <Link to="/map" className={`w-full h-12 rounded-2xl flex items-center justify-center gap-2.5 text-sm font-medium transition-all hover:scale-[1.02] ${cls}`}>
      {icon}
      {label}
    </Link>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.2 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 16.3 4.5 9.7 8.8 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 43.5c5 0 9.6-1.9 13.1-5l-6-5c-2 1.4-4.5 2.3-7.1 2.3-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.6 39.2 16.2 43.5 24 43.5z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6 5C39.7 36 43.5 30.5 43.5 24c0-1.2-.1-2.4-.4-3.5z" />
    </svg>
  );
}