import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Globe, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const slides = [
  {
    icon: Shield,
    title: "Bank-grade security",
    desc: "Your keys, your crypto. Protected by biometric auth, PIN, and an encrypted recovery phrase.",
  },
  {
    icon: Globe,
    title: "Multi-chain, one app",
    desc: "Manage Ethereum, BSC, Solana, Polygon and more — all from a single, beautiful dashboard.",
  },
  {
    icon: Zap,
    title: "Built-in dApp browser",
    desc: "Swap, stake, mint NFTs and explore Web3 directly inside FlapWallet.",
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const isLast = step === slides.length - 1;
  const Slide = slides[step];
  const Icon = Slide.icon;

  return (
    <div className="relative flex h-full min-h-screen flex-col bg-[hsl(0_0%_5%)] text-white md:min-h-[860px]">
      <div className="absolute inset-0 gradient-glow opacity-50" />

      <header className="relative flex items-center justify-between px-6 pt-8">
        <Logo size={36} />
        <button
          onClick={() => navigate("/setup")}
          className="text-sm text-white/60 transition-smooth hover:text-white"
        >
          Skip
        </button>
      </header>

      <div key={step} className="relative flex flex-1 flex-col items-center justify-center gap-10 px-8 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl" />
          <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-primary/30 bg-primary/10 backdrop-blur">
            <Icon className="h-14 w-14 text-primary" strokeWidth={1.5} />
          </div>
        </div>
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold leading-tight">{Slide.title}</h2>
          <p className="mx-auto mt-3 max-w-xs text-balance text-white/60">{Slide.desc}</p>
        </div>
      </div>

      <div className="relative flex flex-col gap-6 px-6 pb-10">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-smooth",
                i === step ? "w-8 bg-primary" : "w-1.5 bg-white/20"
              )}
            />
          ))}
        </div>
        <Button
          size="lg"
          onClick={() => (isLast ? navigate("/setup") : setStep(step + 1))}
          className="group h-14 w-full rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-glow hover:bg-primary-glow"
        >
          {isLast ? "Get started" : "Continue"}
          <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
