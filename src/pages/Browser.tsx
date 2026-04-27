import { useNavigate } from "react-router-dom";
import { Search, Star, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { dapps } from "@/lib/wallet-data";
import { toast } from "sonner";

const Browser = () => {
  const navigate = useNavigate();
  const open = (name: string) => toast.info(`Opening ${name}…`, { description: "dApp browser is in demo mode" });

  return (
    <div className="min-h-full bg-background">
      <header className="px-5 pt-8 pb-4">
        <h1 className="font-display text-2xl font-bold">Discover</h1>
        <p className="text-sm text-muted-foreground">Explore Web3 directly from your wallet</p>
        <p className="text-sm text-muted-foreground">CA:</p>
        <p className="text-sm text-muted-foreground">7777</p>
      </header>

      <div className="px-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search dApps or paste URL"
            className="h-12 rounded-2xl border-0 bg-card pl-11 shadow-card focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>

      <section className="mt-6 px-5">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider">Trending</h2>
        </div>
        <div className="-mx-5 overflow-x-auto px-5 no-scrollbar">
          <div className="flex gap-3">
            {dapps.slice(0, 4).map((d) => (
              <button
                key={d.id}
                onClick={() => open(d.name)}
                className="group relative shrink-0 overflow-hidden rounded-2xl shadow-card transition-smooth hover:scale-[1.02]"
                style={{ width: 220, height: 130, background: `linear-gradient(135deg, ${d.color}, ${d.color}99)` }}
              >
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                  <div className="text-3xl">{d.icon}</div>
                  <div>
                    <div className="text-xs uppercase tracking-wider opacity-80">{d.category}</div>
                    <div className="font-display text-lg font-bold">{d.name}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 px-5 pb-10">
        <div className="mb-3 flex items-center gap-2">
          <Star className="h-4 w-4 text-primary" />
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider">Popular dApps</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {dapps.map((d) => (
            <button
              key={d.id}
              onClick={() => open(d.name)}
              className="flex items-center gap-3 rounded-2xl bg-card p-3 text-left shadow-card transition-smooth hover:bg-secondary"
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                style={{ background: `${d.color}20`, color: d.color }}
              >
                {d.icon}
              </div>
              <div className="min-w-0">
                <div className="truncate font-semibold">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.category}</div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Browser;
