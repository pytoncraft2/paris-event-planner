import { useRouterState } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[100dvh] w-full justify-center overflow-hidden">
      <div className="flex h-full w-full max-w-[430px] flex-col overflow-hidden border-border bg-background sm:border-x">
        {children}
      </div>
    </div>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  action,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  action?: ReactNode;
}) {
  return (
    <header className="shrink-0 border-b border-border bg-card px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="-ml-2 flex size-11 shrink-0 items-center justify-center rounded-xl text-foreground hover:bg-muted"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
        ) : (
          <span className="size-0" />
        )}
        <div className="min-w-0">
          <h1
            className={cn(
              "truncate text-lg font-semibold text-foreground",
              !onBack && "text-xl",
            )}
          >
            {title}
          </h1>
          {subtitle ? (
            <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center">{action}</div>
      </div>
    </header>
  );
}

export function ScreenBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // key={pathname}: each route gets a fresh scroll container, so a new screen
  // always opens at the top (the scroll lives in this element, not on window).
  return (
    <main
      key={pathname}
      className={cn("min-h-0 flex-1 overflow-x-hidden overflow-y-auto", className)}
    >
      {children}
    </main>
  );
}
