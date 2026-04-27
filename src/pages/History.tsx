import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Repeat, Filter } from "lucide-react";
import { transactions, formatCurrency } from "@/lib/wallet-data";
import { cn } from "@/lib/utils";

const filters = ["All", "Sent", "Received", "Swaps"];

const formatTime = (ts: number) => {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const History = () => {
  const [filter, setFilter] = useState("All");
  const filtered = transactions.filter((t) =>
    filter === "All" ||
    (filter === "Sent" && t.type === "send") ||
    (filter === "Received" && t.type === "receive") ||
    (filter === "Swaps" && t.type === "swap")
  );

  return (
    <div className="min-h-full bg-background">
      <header className="px-5 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">Activity</h1>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto px-5 pb-3 no-scrollbar">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-smooth",
              filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="px-5 pb-10">
        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <ArrowUpRight className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium">No transactions yet</p>
            <p className="text-sm text-muted-foreground">Your activity will appear here.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {filtered.map((t) => {
              const Icon = t.type === "receive" ? ArrowDownLeft : t.type === "send" ? ArrowUpRight : Repeat;
              return (
                <div key={t.id} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-card animate-slide-up">
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full",
                      t.type === "receive" ? "bg-success/15 text-success" : t.type === "send" ? "bg-destructive/15 text-destructive" : "bg-primary/15 text-primary"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium capitalize">{t.type}</span>
                      <span className="text-xs text-muted-foreground">{t.asset}</span>
                      {t.status === "pending" && (
                        <span className="rounded-full bg-yellow-500/15 px-1.5 py-0.5 text-[10px] font-medium text-yellow-600">Pending</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{t.address} · {formatTime(t.timestamp)}</div>
                  </div>
                  <div className="text-right">
                    <div className={cn("font-medium", t.type === "receive" && "text-success")}>
                      {t.type === "receive" ? "+" : t.type === "send" ? "-" : ""}{formatCurrency(t.value)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
