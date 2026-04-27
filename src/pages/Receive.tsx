import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";

const ADDRESS = "0x742d35Cc6634C0532925a3b8d4017aB43A8c12fE";

const Receive = () => {
  const navigate = useNavigate();
  const copy = () => {
    navigator.clipboard.writeText(ADDRESS);
    toast.success("Address copied to clipboard");
  };

  return (
    <div className="min-h-full bg-background">
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-lg font-semibold">Receive</h1>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <Share2 className="h-5 w-5" />
        </button>
      </header>

      <div className="flex flex-col items-center px-6 pt-4 text-center">
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Ethereum Network</div>
        <p className="mt-3 max-w-xs text-sm text-muted-foreground">
          Only send Ethereum (ETH) and ERC-20 tokens to this address.
        </p>

        <div className="relative mt-8 rounded-3xl bg-white p-6 shadow-elevated">
          <QRCodeSVG
            value={ADDRESS}
            size={224}
            bgColor="#ffffff"
            fgColor="#0d0d0d"
            level="H"
            imageSettings={{ src: "", height: 0, width: 0, excavate: false }}
          />
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white">
            <Logo size={40} />
          </div>
        </div>

        <div className="mt-6 w-full rounded-2xl bg-card p-4 shadow-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Your address</div>
          <div className="mt-2 break-all font-mono text-sm">{ADDRESS}</div>
        </div>

        <div className="mt-6 grid w-full grid-cols-2 gap-3">
          <Button onClick={copy} className="h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary-glow">
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="secondary" className="h-12 rounded-2xl">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Receive;
