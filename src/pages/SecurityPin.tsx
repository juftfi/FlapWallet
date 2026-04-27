import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fingerprint, Delete, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const SecurityPin = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");

  const press = (n: string) => {
    if (pin.length >= 6) return;
    const next = pin + n;
    setPin(next);
    if (next.length === 6) {
      setTimeout(() => navigate("/wallet"), 350);
    }
  };
  const back = () => setPin((p) => p.slice(0, -1));

  return (
    <div className="relative flex h-full min-h-screen flex-col bg-[hsl(0_0%_5%)] text-white md:min-h-[860px]">
      <header className="flex items-center justify-between px-6 pt-8">
        <button onClick={() => navigate(-1)} className="text-white/60 hover:text-white">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <Logo size={32} />
        <div className="w-6" />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <h1 className="font-display text-2xl font-bold">Create your PIN</h1>
        <p className="mt-2 text-center text-white/60">A 6-digit PIN secures your wallet on this device.</p>

        <div className="mt-12 flex gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-3.5 w-3.5 rounded-full border-2 transition-smooth",
                i < pin.length ? "border-primary bg-primary" : "border-white/20"
              )}
            />
          ))}
        </div>

        <button className="mt-10 flex items-center gap-2 text-sm text-primary" onClick={() => navigate("/wallet")}>
          <Fingerprint className="h-5 w-5" /> Use biometric instead
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 px-8 pb-12">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "back"].map((k, i) => {
          if (k === "") return <div key={i} />;
          if (k === "back")
            return (
              <button
                key={i}
                onClick={back}
                className="flex h-16 items-center justify-center rounded-2xl text-white/70 transition-smooth hover:bg-white/5 active:scale-95"
              >
                <Delete className="h-6 w-6" />
              </button>
            );
          return (
            <button
              key={i}
              onClick={() => press(k)}
              className="flex h-16 items-center justify-center rounded-2xl text-2xl font-medium transition-smooth hover:bg-white/5 active:scale-95"
            >
              {k}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SecurityPin;
