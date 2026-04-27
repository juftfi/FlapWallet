import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowDownLeft, ArrowUpRight, Repeat, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssetIcon } from "@/components/AssetIcon";
import { assets, transactions, formatCurrency, formatCrypto } from "@/lib/wallet-data";
import { cn } from "@/lib/utils";

const AssetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const asset = assets.find((a) => a.id === id);
  if (!asset) return <div className="p-10 text-center">Asset not found.</div>;

  const value = asset.balance * asset.price;
  const txs = transactions.filter((t) => t.asset.includes(asset.symbol));

  // mini chart
  const points = Array.from({ length: 24 }, (_, i) =>
    50 + Math.sin(i / 2 + asset.symbol.length) * 18 + (i * (asset.change24h / 8))
  );
  const path = points
    .map((p, i) => `${(i / (points.length - 1)) * 100},${100 - p}`)
    .join(" L ");

  return (
    <div className="min-h-full bg-background">
      <div className="relative overflow-hidden bg-[hsl(0_0%_5%)] px-5 pb-8 pt-8 text-white">
        <div className="absolute inset-0 gradient-glow opacity-50" />
        <div className="relative flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 backdrop-blur hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <AssetIcon icon={asset.icon} color={asset.color} size={28} />
            <span className="font-semibold">{asset.name}</span>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 backdrop-blur hover:bg-white/10">
            <Star className="h-4 w-4" />
          </button>
        </div>

        <div className="relative mt-8 text-center">
          <div className="text-xs uppercase tracking-wider text-white/50">Balance</div>
          <div className="mt-2 font-display text-4xl font-bold">{formatCrypto(asset.balance, asset.symbol)}</div>
          <div className="mt-1 text-white/60">{formatCurrency(value)}</div>
          <div
            className={cn(
              "mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
              asset.change24h >= 0 ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
            )}
          >
            {asset.change24h >= 0 ? "▲" : "▼"} {asset.change24h.toFixed(2)}% · 24h
          </div>
        </div>

        <div className="relative mt-6 h-32">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id={`g-${asset.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={`hsl(var(--primary))`} stopOpacity="0.4" />
                <stop offset="100%" stopColor={`hsl(var(--primary))`} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`M ${path} L 100,100 L 0,100 Z`} fill={`url(#g-${asset.id})`} />
            <path d={`M ${path}`} fill="none" stroke={`hsl(var(--primary))`} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        <div className="relative mt-2 grid grid-cols-4 gap-2 text-xs">
          {["1H", "1D", "1W", "1M"].map((t, i) => (
            <button
              key={t}
              className={cn(
                "rounded-full py-1.5 transition-smooth",
                i === 1 ? "bg-primary text-primary-foreground" : "bg-white/5 text-white/60 hover:bg-white/10"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="grid grid-cols-3 gap-2">
          <Button onClick={() => navigate("/send")} className="h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary-glow">
            <ArrowUpRight className="mr-1 h-4 w-4" /> Send
          </Button>
          <Button onClick={() => navigate("/receive")} variant="secondary" className="h-12 rounded-2xl">
            <ArrowDownLeft className="mr-1 h-4 w-4" /> Receive
          </Button>
          <Button variant="secondary" className="h-12 rounded-2xl">
            <Repeat className="mr-1 h-4 w-4" /> Swap
          </Button>
        </div>

        <h3 className="mt-8 mb-3 font-display text-base font-semibold">Recent activity</h3>
        {txs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No transactions yet
          </div>
        ) : (
          <div className="space-y-1">
            {txs.map((t) => (
              <div key={t.id} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-card">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    t.type === "receive" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
                  )}
                >
                  {t.type === "receive" ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium capitalize">{t.type}</div>
                  <div className="text-xs text-muted-foreground truncate">{t.address}</div>
                </div>
                <div className="text-right">
                  <div className={cn("font-medium", t.type === "receive" ? "text-success" : "")}>
                    {t.type === "receive" ? "+" : "-"}{t.amount} {asset.symbol}
                  </div>
                  <div className="text-xs text-muted-foreground">{formatCurrency(t.value)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetDetail;
