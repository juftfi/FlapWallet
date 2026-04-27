import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AssetIconProps {
  symbol?: string;
  color: string;
  icon: ReactNode;
  size?: number;
  className?: string;
}

export const AssetIcon = ({ color, icon, size = 44, className }: AssetIconProps) => (
  <div
    className={cn("flex items-center justify-center rounded-full font-bold text-white shrink-0", className)}
    style={{
      width: size,
      height: size,
      background: `linear-gradient(135deg, ${color}, ${color}cc)`,
      fontSize: size * 0.45,
    }}
  >
    {icon}
  </div>
);
