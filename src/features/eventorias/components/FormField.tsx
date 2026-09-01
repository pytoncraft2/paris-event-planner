import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string | undefined;
  hint?: string | undefined;
  children: (props: { id: string; invalid: boolean; className: string }) => ReactNode;
};

const baseControl =
  "w-full min-h-11 rounded-xl border bg-card px-3.5 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function FormField({ id, label, required, error, hint, children }: FormFieldProps) {
  const invalid = Boolean(error);
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </label>
      {children({
        id,
        invalid,
        className: cn(baseControl, invalid ? "border-destructive" : "border-border"),
      })}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="text-sm text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
