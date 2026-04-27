import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, ScanLine, ChevronDown, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AssetIcon } from "@/components/AssetIcon";
import { assets, formatCurrency } from "@/lib/wallet-data";
import { toast } from "sonner";

const Send = () => {
  const navigate = useNavigate();
  const [asset, setAsset] = useState(assets[1]);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const value = parseFloat(amount || "0") * asset.price;

  return (
    <div className="min-h-full bg-background">
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-lg font-semibold">Send</h1>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <ScanLine className="h-5 w-5" />
        </button>
      </header>

      <div className="px-5 pb-32">
        <div className="rounded-2xl bg-card p-4 shadow-card">
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Asset</label>
          <button className="mt-2 flex w-full items-center gap-3">
            <AssetIcon icon={asset.icon} color={asset.color} />
            <div className="flex-1 text-left">
              <div className="font-semibold">{asset.name}</div>
              <div className="text-xs text-muted-foreground">Balance: {asset.balance} {asset.symbol}</div>
            </div>
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="mt-3 rounded-2xl bg-card p-5 shadow-card text-center">
          <label className="text-xs uppercase tracking-wider text-muted-foreground">You send</label>
          <div className="mt-3 flex items-baseline justify-center gap-2">
            <input
              autoFocus
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              inputMode="decimal"
              className="w-full bg-transparent text-center font-display text-5xl font-bold outline-none placeholder:text-muted-foreground/40"
            />
          </div>
          <div className="mt-2 text-sm text-muted-foreground">≈ {formatCurrency(value)}</div>
          <div className="mt-4 flex justify-center gap-2">
            {["25%", "50%", "MAX"].map((p) => (
              <button
                key={p}
                onClick={() =>
                  setAmount(
                    String(asset.balance * (p === "25%" ? 0.25 : p === "50%" ? 0.5 : 1))
                  )
                }
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium hover:bg-muted"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="my-3 flex justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-4 border-background bg-secondary">
            <ArrowDown className="h-4 w-4" />
          </div>
        </div>

        <div className="rounded-2xl bg-card p-4 shadow-card">
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Recipient address</label>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x… or ENS name"
            className="mt-2 h-12 border-0 bg-secondary font-mono text-sm focus-visible:ring-1 focus-visible:ring-primary"
          />
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>Network fee</span>
            <span className="font-medium text-foreground">~ $1.24 · Fast</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-20 px-5">
        <Button
          size="lg"
          disabled={!amount || !address}
          onClick={() => {
            toast.success("Transaction sent!", { description: `${amount} ${asset.symbol} to ${address.slice(0, 10)}…` });
            navigate("/wallet");
          }}
          className="h-14 w-full rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-glow hover:bg-primary-glow"
        >
          Review & Send
        </Button>
      </div>
    </div>
  );
};

export default Send;
