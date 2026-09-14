import { CalendarDays, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type Tab = "events" | "profile";

type BottomNavProps = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

const TABS = [
  { id: "events" as const, label: "Explore", Icon: CalendarDays },
  { id: "profile" as const, label: "Profile", Icon: User },
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav
      aria-label="Main"
      className="shrink-0 border-t border-border bg-card pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-2">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onChange(id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex h-14 w-full flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="size-5" aria-hidden />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
