import logo from "@/assets/flap-logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export const Logo = ({ size = 40, className, glow = false }: LogoProps) => (
  <img
    src={logo}
    alt="FlapWallet"
    width={size}
    height={size}
    className={cn("rounded-full", glow && "shadow-glow", className)}
    style={{ width: size, height: size }}
  />
);
