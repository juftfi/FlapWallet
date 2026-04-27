import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";

interface PhoneFrameProps {
  children?: ReactNode;
  withNav?: boolean;
}

/** Mobile-first frame. On large screens displays a centered phone-like canvas. */
export const PhoneFrame = ({ children, withNav = true }: PhoneFrameProps) => {
  return (
    <div className="min-h-screen w-full bg-background">
      {/* Ambient backdrop on desktop */}
      <div className="pointer-events-none fixed inset-0 hidden md:block">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[440px] flex-col overflow-hidden bg-background md:my-6 md:min-h-[860px] md:max-h-[860px] md:rounded-[44px] md:border md:border-border/60 md:shadow-elevated">
        <div className="relative flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-24">
          {children ?? <Outlet />}
        </div>
        {withNav && <BottomNav />}
      </div>
    </div>
  );
};
