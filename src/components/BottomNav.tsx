import { NavLink, useLocation } from "react-router-dom";
import { Home, Compass, ArrowUpDown, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/wallet", label: "Wallet", icon: Home },
  { to: "/browser", label: "Browser", icon: Compass },
  { to: "/history", label: "History", icon: ArrowUpDown },
  { to: "/settings", label: "Settings", icon: Settings },
];

export const BottomNav = () => {
  const { pathname } = useLocation();
  return (
    <nav className="absolute inset-x-0 bottom-0 z-30 px-3 pb-3 pt-2">
      <div className="glass mx-auto flex items-center justify-around rounded-2xl border border-border/40 px-2 py-2 shadow-elevated">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 transition-smooth",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5 transition-smooth", active && "scale-110")} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-medium tracking-wide">{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
