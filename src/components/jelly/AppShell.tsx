import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Heart, Home, Map as MapIcon, MessageCircle, Sparkles, User } from "lucide-react";
import { me } from "@/data/user";

export function TopBar() {
  const { location } = useRouterState();
  const modes = [
    { to: "/map", icon: Compass, label: "Discover" },
    { to: "/match", icon: Sparkles, label: "Match" },
    { to: "/saved", icon: Heart, label: "Saved" },
  ] as const;
  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[min(96vw,720px)]">
      <div className="glass-strong rounded-full pl-2 pr-2 py-2 flex items-center justify-between shadow-[var(--shadow-card)]">
        <Link to="/profile" className="flex items-center gap-2 pl-1 pr-3 group">
          <div className="relative size-9 rounded-full overflow-hidden border border-primary/40">
            <img src={me.avatar} alt="" className="w-full h-full" />
            <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-primary border-2 border-background" />
          </div>
          <div className="hidden sm:block text-left leading-tight">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Hi,</p>
            <p className="text-xs font-semibold">{me.name}</p>
          </div>
        </Link>
        <div className="flex items-center gap-1">
          {modes.map(({ to, icon: Icon, label }) => {
            const active = location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                aria-label={label}
                className={`size-10 rounded-full flex items-center justify-center transition-all ${
                  active
                    ? "bg-aurora text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-card"
                }`}
              >
                <Icon size={17} />
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  const { location } = useRouterState();
  const items = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/map", icon: MapIcon, label: "Map" },
    { to: "/match", icon: Sparkles, label: "Match" },
    { to: "/saved", icon: MessageCircle, label: "Inbox" },
    { to: "/profile", icon: User, label: "Me" },
  ] as const;
  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[min(96vw,520px)]">
      <div className="glass-strong rounded-full px-2 py-2 flex items-center justify-between shadow-[var(--shadow-card)]">
        {items.map(({ to, icon: Icon, label }) => {
          const active = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-full text-[10px] font-medium transition-all ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active && <span className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30" />}
              <Icon size={18} className="relative" />
              <span className="relative">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100svh] relative">
      <TopBar />
      <main className="pt-20 pb-28">{children}</main>
      <BottomNav />
    </div>
  );
}