import { useNavigate } from "react-router-dom";
import { ChevronRight, Fingerprint, Lock, KeyRound, Bell, Globe, HelpCircle, LogOut, Moon, X, User, XIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";

const groups = [
  {
    title: "Social",
    items: [
      { id: "social", label: "@flapwallet", icon: XIcon },
      { id: "biometric", label: "t.me/flap_wallet", icon: User },
    ],
  },
  {
    title: "Security",
    items: [
      { id: "biometric", label: "Biometric authentication", icon: Fingerprint, toggle: true },
      { id: "pin", label: "Change PIN", icon: Lock, link: true },
      { id: "phrase", label: "Recovery phrase", icon: KeyRound, link: true, danger: true },
    ],
  },
  {
    title: "Preferences",
    items: [
      { id: "dark", label: "Dark mode", icon: Moon, toggle: true },
      { id: "notify", label: "Notifications", icon: Bell, toggle: true },
      { id: "network", label: "Networks", icon: Globe, link: true },
    ],
  },
  {
    title: "Support",
    items: [
      { id: "help", label: "Help center", icon: HelpCircle, link: true },
    ],
  },
];

const Settings = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleClick = (id: string, danger?: boolean) => {
    if (id === "phrase") {
      toast.warning("Never share your recovery phrase", {
        description: "Anyone with these 12 words can access your funds.",
      });
    } else if (id === "pin") {
      navigate("/security");
    } else {
      toast.info("Coming soon");
    }
  };

  return (
    <div className="min-h-full bg-background">
      <header className="px-5 pt-8 pb-4">
        <h1 className="font-display text-2xl font-bold">Settings</h1>
      </header>

      <div className="px-5">
        <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
          <Logo size={48} glow />
          <div className="flex-1">
            <div className="font-semibold">Main Wallet</div>
            <div className="font-mono text-xs text-muted-foreground">0x742d…3a8c</div>
          </div>
          <button className="rounded-full bg-secondary px-3 py-1 text-xs font-medium hover:bg-muted">Edit</button>
        </div>

        {groups.map((g) => (
          <section key={g.title} className="mt-6">
            <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{g.title}</h2>
            <div className="overflow-hidden rounded-2xl bg-card shadow-card">
              {g.items.map((item, i) => {
                const Icon = item.icon;
                const isLast = i === g.items.length - 1;
                return (
                  <div
                    key={item.id}
                    onClick={() => item.link && handleClick(item.id, item.danger)}
                    className={`flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-smooth hover:bg-secondary ${!isLast ? "border-b border-border/60" : ""}`}
                  >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.danger ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className={`flex-1 text-sm ${item.danger ? "text-destructive font-medium" : "font-medium"}`}>{item.label}</span>
                    {item.toggle && (
                      <Switch
                        defaultChecked={item.id !== "biometric"}
                        checked={item.id === "dark" ? dark : undefined}
                        onCheckedChange={item.id === "dark" ? setDark : undefined}
                      />
                    )}
                    {item.link && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <button
          onClick={() => navigate("/")}
          className="mt-8 mb-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 py-3.5 text-sm font-medium text-destructive transition-smooth hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" /> Lock wallet
        </button>

        <p className="pb-6 text-center text-xs text-muted-foreground">FlapWallet · v1.0.0</p>
      </div>
    </div>
  );
};

export default Settings;
