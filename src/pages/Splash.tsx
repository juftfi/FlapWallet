import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";

const Splash = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate("/onboarding"), 1800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="relative flex h-full min-h-screen flex-col items-center justify-center bg-[hsl(0_0%_5%)] text-white md:min-h-[860px]">
      <div className="absolute inset-0 gradient-glow opacity-70" />
      <div className="relative flex flex-col items-center gap-6 animate-scale-in">
        <div className="animate-float">
          <Logo size={108} glow />
        </div>
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight">FlapWallet</h1>
          <p className="mt-2 text-sm text-white/60">Your gateway to Web3</p>
        </div>
      </div>
      <div className="absolute bottom-10 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:120ms]" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:240ms]" />
      </div>
    </div>
  );
};

export default Splash;
