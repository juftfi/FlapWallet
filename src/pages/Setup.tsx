import { useNavigate } from "react-router-dom";
import { Plus, Download, ShieldCheck, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const Setup = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex h-full min-h-screen flex-col bg-[hsl(0_0%_5%)] text-white md:min-h-[860px]">
      <div className="absolute inset-0 gradient-glow opacity-40" />
      <header className="relative flex items-center justify-center px-6 pt-10">
        <Logo size={48} glow />
      </header>

      <div className="relative flex-1 px-6 pt-10">
        <h1 className="font-display text-3xl font-bold leading-tight">Set up your wallet</h1>
        <p className="mt-2 text-white/60">Create a new wallet or import an existing one with your secret recovery phrase.</p>

        <div className="mt-10 space-y-3">
          <button
            onClick={() => navigate("/security")}
            className="group flex w-full items-center gap-4 rounded-2xl border border-primary/30 bg-primary/10 p-5 text-left transition-smooth hover:bg-primary/15"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Plus className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Create new wallet</div>
              <div className="text-sm text-white/60">Generate a fresh 12-word recovery phrase</div>
            </div>
          </button>

          <button
            onClick={() => navigate("/security")}
            className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition-smooth hover:bg-white/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <Download className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">I already have a wallet</div>
              <div className="text-sm text-white/60">Import using your secret recovery phrase</div>
            </div>
          </button>
        </div>

        <div className="mt-10 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="text-sm">Non-custodial — you own your keys</span>
          </div>
          <div className="flex items-center gap-3">
            <KeyRound className="h-5 w-5 text-primary" />
            <span className="text-sm">Encrypted locally on your device</span>
          </div>
        </div>
      </div>

      <div className="relative px-6 pb-10 pt-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/wallet")}
          className="w-full text-white/60 hover:bg-white/5 hover:text-white"
        >
          Continue as guest
        </Button>
      </div>
    </div>
  );
};

export default Setup;
