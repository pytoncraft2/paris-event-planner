import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScreenBody, ScreenHeader } from "../components/Shell";

function GoogleMark() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.85.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.94v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.94a9 9 0 0 0 0 8.1l3.03-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .94 4.95l3.03 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}

export function SignInGateScreen({
  onBack,
  onSignIn,
  onNotNow,
}: {
  onBack: () => void;
  onSignIn: () => void;
  onNotNow: () => void;
}) {
  return (
    <>
      <ScreenHeader title="Sign in" onBack={onBack} />
      <ScreenBody className="px-4 py-6">
        <h2 className="text-xl leading-snug font-semibold text-foreground">
          Sign in to save events to your calendar
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Your saved events stay with your Eventorias account, so you can find them on
          any device during your stay.
        </p>

        <div className="mt-7 space-y-3">
          <Button
            variant="outline"
            className="h-12 w-full justify-center gap-2 rounded-xl border-border bg-card text-base font-medium"
            onClick={onSignIn}
          >
            <GoogleMark />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="h-12 w-full justify-center gap-2 rounded-xl border-border bg-card text-base font-medium"
            onClick={onSignIn}
          >
            <Mail className="size-4" aria-hidden />
            Continue with email
          </Button>
          <Button
            variant="ghost"
            className="h-12 w-full rounded-xl text-base font-medium text-muted-foreground"
            onClick={onNotNow}
          >
            Not now
          </Button>
        </div>
      </ScreenBody>
    </>
  );
}
