import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Flame, Map as MapIcon } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: Compass },
  { to: "/swipe", label: "Swipe", icon: Flame },
  { to: "/map", label: "Map", icon: MapIcon },
] as const;

export function NavBar() {
  const { location } = useRouterState();
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,720px)]">
      <nav className="glass-strong rounded-full px-3 py-2 flex items-center justify-between shadow-[var(--shadow-card)]">
        <Link to="/" className="flex items-center gap-2 pl-2 pr-3">
          <span className="size-7 rounded-full bg-aurora animate-pulse-glow" />
          <span className="font-display font-bold tracking-tight text-base">JellyBelly</span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                  active
                    ? "bg-aurora text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}