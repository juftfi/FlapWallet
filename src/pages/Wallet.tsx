import { useNavigate } from "react-router-dom";
import { ArrowDownLeft, ArrowUpRight, Repeat, Compass, Eye, EyeOff, Bell, Copy, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { AssetIcon } from "@/components/AssetIcon";
import { assets, formatCurrency, formatCrypto, totalBalance } from "@/lib/wallet-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const actions = [
  { id: "send", label: "Send", icon: ArrowUpRight, to: "/send" },
  { id: "receive", label: "Receive", icon: ArrowDownLeft, to: "/receive" },
  { id: "swap", label: "Swap", icon: Repeat, to: "/swap" },
  { id: "browser", label: "dApps", icon: Compass, to: "/browser" },
];

const Wallet = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);
  const total = totalBalance();
  const totalChange = assets.reduce((sum, a) => sum + a.balance * a.price * (a.change24h / 100), 0);
  const totalChangePct = (totalChange / total) * 100;

  return (
    <div className="min-h-full bg-background text-foreground">
      {/* Header */}
      <div className="relative overflow-hidden bg-[hsl(0_0%_5%)] px-5 pb-10 pt-8 text-white">
        <div className="absolute inset-0 gradient-glow opacity-60" />
        <div className="relative flex items-center justify-between">
          <button className="flex items-center gap-2 rounded-full bg-white/5 py-1.5 pl-1.5 pr-3 backdrop-blur transition-smooth hover:bg-white/10">
            <Logo size={28} />
            <span className="text-sm font-medium">Main Wallet</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText("0x742d35cc6634c0532925a3b8d4017ab43a8c");
                toast.success("Address copied");
              }}
              className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs backdrop-blur transition-smooth hover:bg-white/10"
            >
              0x742d…3a8c <Copy className="h-3 w-3" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 backdrop-blur transition-smooth hover:bg-white/10">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/50">
            Total balance
            <button onClick={() => setHide((h) => !h)} className="text-white/40 hover:text-white">
              {hide ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
          <div className="mt-2 font-display text-5xl font-bold tracking-tight">
            {hide ? "•••••••" : formatCurrency(total)}
          </div>
          <div
            className={cn(
              "mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
              totalChange >= 0 ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
            )}
          >
            {totalChange >= 0 ? "▲" : "▼"} {formatCurrency(Math.abs(totalChange))} ({totalChangePct.toFixed(2)}%)
            <span className="text-white/50">today</span>
          </div>
        </div>

        <div className="relative mt-8 grid grid-cols-4 gap-2">
          {actions.map(({ id, label, icon: Icon, to }) => (
            <button
              key={id}
              onClick={() => navigate(to)}
              className="group flex flex-col items-center gap-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow transition-smooth group-hover:scale-105 group-active:scale-95">
                <Icon className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Asset list */}
      <div className="-mt-6 rounded-t-[28px] bg-background px-5 pb-10 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Your assets</h2>
          <button className="text-xs text-muted-foreground hover:text-foreground">Manage</button>
        </div>

        <div className="space-y-1.5">
          {assets.map((a, i) => {
            const value = a.balance * a.price;
            return (
              <button
                key={a.id}
                onClick={() => navigate(`/asset/${a.id}`)}
                style={{ animationDelay: `${i * 40}ms` }}
                className="flex w-full items-center gap-3 rounded-2xl bg-card p-3 text-left shadow-card transition-smooth hover:bg-secondary animate-slide-up"
              >
                <AssetIcon icon={a.icon} color={a.color} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{a.name}</span>
                    <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{a.chain}</span>
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {formatCurrency(a.price)}{" "}
                    <span className={cn("ml-1", a.change24h >= 0 ? "text-success" : "text-destructive")}>
                      {a.change24h >= 0 ? "+" : ""}{a.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{hide ? "•••••" : formatCurrency(value)}</div>
                  <div className="text-xs text-muted-foreground">{hide ? "•••" : formatCrypto(a.balance, a.symbol)}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
