import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormField } from "../components/FormField";
import { ScreenBody, ScreenHeader } from "../components/Shell";
import type { EventItem, Language } from "../types";
import { PROFILE } from "../data";

export type FormStep = 1 | 2 | 3;

export type FormStepSearch = { step?: 2 | 3 };

export function formStepFromSearch(search: Record<string, unknown>): FormStep {
  const raw = search["step"];
  const n = typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : NaN;
  return n === 2 || n === 3 ? n : 1;
}

export function formStepSearch(step: FormStep): FormStepSearch {
  return step === 1 ? {} : { step };
}

type FormValues = {
  title: string;
  description: string;
  date: string;
  time: string;
  address: string;
  price: string;
  language: Language;
};

type ErrorKey = "title" | "date" | "time" | "address";
type Errors = Partial<Record<ErrorKey, string>>;

const STEP_FIELDS: Record<FormStep, ErrorKey[]> = {
  1: ["title"],
  2: ["date", "time", "address"],
  3: [],
};

const STEP_COPY: Record<FormStep, { heading: string; bar: string }> = {
  1: { heading: "About the event", bar: "w-1/3" },
  2: { heading: "When & where", bar: "w-2/3" },
  3: { heading: "Details", bar: "w-full" },
};

function toValues(event: EventItem | null): FormValues {
  return {
    title: event?.title ?? "",
    description: event?.description ?? "",
    date: event?.date ?? "",
    time: event?.time ?? "",
    address: event?.address ?? "",
    price: event ? (event.price === 0 ? "" : String(event.price)) : "",
    language: event?.language ?? "English",
  };
}

function neighborhoodFrom(address: string): string {
  const match = address.match(/750(\d{2})/);
  if (!match) return "Paris";
  const n = Number(match[1]);
  return n === 1 ? "Paris 1er" : `Paris ${n}e`;
}

function validateFields(values: FormValues, fields: ErrorKey[]): Errors {
  const next: Errors = {};
  if (fields.includes("title") && !values.title.trim()) next.title = "Title is required";
  if (fields.includes("date") && !values.date.trim()) next.date = "Date is required";
  if (fields.includes("time") && !values.time.trim()) next.time = "Time is required";
  if (fields.includes("address") && !values.address.trim()) next.address = "Address is required";
  return next;
}

function stepForField(field: ErrorKey): FormStep {
  if (field === "title") return 1;
  return 2;
}

export function EventFormScreen({
  editing,
  step,
  onBack,
  onContinue,
  onSubmit,
}: {
  editing: EventItem | null;
  step: FormStep;
  onBack: () => void;
  onContinue: () => void;
  onSubmit: (event: EventItem) => void;
}) {
  const isEdit = editing !== null;
  const navigate = useNavigate();
  const [values, setValues] = useState<FormValues>(() => toValues(editing));
  const [errors, setErrors] = useState<Errors>({});
  const [imagePreview, setImagePreview] = useState<string | undefined>(editing?.image);
  const objectUrlRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const skipStepScrollRef = useRef(false);

  useEffect(
    () => () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    },
    [],
  );

  useEffect(() => {
    if (skipStepScrollRef.current) {
      skipStepScrollRef.current = false;
      return;
    }
    document.querySelector("main")?.scrollTo({ top: 0 });
  }, [step]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setImagePreview(url);
  };

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const focusFirstInvalid = (next: Errors) => {
    const firstInvalid = (["title", "date", "time", "address"] as const).find((k) => next[k]);
    if (!firstInvalid) return;
    const el = document.getElementById(firstInvalid);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus({ preventScroll: true });
  };

  const goToStep = (next: FormStep, replace = false) => {
    void navigate({ to: ".", search: formStepSearch(next), replace });
  };

  const showFieldErrors = (next: Errors) => {
    setErrors(next);
    requestAnimationFrame(() => focusFirstInvalid(next));
  };

  const publish = () => {
    const next = validateFields(values, ["title", "date", "time", "address"]);
    if (Object.keys(next).length > 0) {
      const firstInvalid = (["title", "date", "time", "address"] as const).find((k) => next[k]);
      const targetStep = firstInvalid ? stepForField(firstInvalid) : step;
      if (targetStep !== step) {
        skipStepScrollRef.current = true;
        goToStep(targetStep, true);
      }
      showFieldErrors(next);
      return;
    }

    const price = Number.parseFloat(values.price.replace(",", "."));
    onSubmit({
      id: editing?.id ?? `ev-${Date.now()}`,
      title: values.title.trim(),
      // Category is not collected in this form: stay neutral.
      category: editing?.category ?? "Event",
      date: values.date,
      time: values.time,
      neighborhood: neighborhoodFrom(values.address),
      venue: editing?.venue ?? (values.address.split(",")[0] ?? values.address).trim(),
      address: values.address.trim(),
      language: values.language,
      price: Number.isFinite(price) && price > 0 ? price : 0,
      description: values.description.trim() || "No description provided yet.",
      organizer: PROFILE.name,
      organizerRole: "Organizer",
      image: imagePreview,
      publishedByMe: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      const next = validateFields(values, STEP_FIELDS[step]);
      if (Object.keys(next).length > 0) {
        showFieldErrors(next);
        return;
      }
      onContinue();
      return;
    }
    publish();
  };

  const copy = STEP_COPY[step];

  return (
    <>
      <ScreenHeader
        title={isEdit ? "Edit event" : "Create event"}
        onBack={() => {
          if (step <= 1) onBack();
          else goToStep((step - 1) as FormStep, true);
        }}
        bottom={
          <div className="mt-1.5">
            <p className="mb-1 text-xs font-medium text-muted-foreground">{step} of 3</p>
            <div
              className="h-1 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={3}
              aria-valuenow={step}
              aria-label={`${step} of 3`}
            >
              <div className={cn("h-full rounded-full bg-primary transition-[width] duration-200", copy.bar)} />
            </div>
          </div>
        }
      />
      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        <ScreenBody className="space-y-5 px-4 pt-3 pb-5">
          <h2 className="text-sm font-semibold text-foreground">{copy.heading}</h2>

          {step === 1 ? (
            <>
              <FormField id="title" label="Title" required error={errors.title}>
                {({ id, invalid, className }) => (
                  <input
                    id={id}
                    className={className}
                    value={values.title}
                    aria-invalid={invalid}
                    aria-describedby={invalid ? `${id}-error` : undefined}
                    onChange={(e) => set("title", e.target.value)}
                    placeholder="Rooftop Sunset Sessions"
                  />
                )}
              </FormField>

              <FormField id="description" label="Description">
                {({ id, className }) => (
                  <textarea
                    id={id}
                    rows={4}
                    className={className}
                    value={values.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="What can guests expect?"
                  />
                )}
              </FormField>

              <div className="relative">
                <p className="mb-1.5 text-sm font-medium text-foreground">Event image</p>
                <input
                  ref={fileInputRef}
                  id="image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif,image/*"
                  className="sr-only"
                  onChange={handleImageChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-border bg-card text-muted-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Selected event image preview"
                      className="size-full object-cover"
                    />
                  ) : (
                    <>
                      <ImageIcon className="size-6" aria-hidden />
                      <span className="text-sm">Choose an image</span>
                    </>
                  )}
                </button>
                {imagePreview ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 min-h-11 text-sm font-medium text-primary"
                  >
                    Replace image
                  </button>
                ) : null}
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <FormField id="date" label="Date" required error={errors.date}>
                {({ id, invalid, className }) => (
                  <input
                    id={id}
                    type="date"
                    className={cn(className, "min-w-0 max-w-full")}
                    value={values.date}
                    aria-invalid={invalid}
                    aria-describedby={invalid ? `${id}-error` : undefined}
                    onChange={(e) => set("date", e.target.value)}
                  />
                )}
              </FormField>

              <FormField id="time" label="Time" required error={errors.time}>
                {({ id, invalid, className }) => (
                  <input
                    id={id}
                    type="time"
                    className={cn(className, "min-w-0 max-w-full")}
                    value={values.time}
                    aria-invalid={invalid}
                    aria-describedby={invalid ? `${id}-error` : undefined}
                    onChange={(e) => set("time", e.target.value)}
                  />
                )}
              </FormField>

              <FormField id="address" label="Address" required error={errors.address}>
                {({ id, invalid, className }) => (
                  <input
                    id={id}
                    className={className}
                    value={values.address}
                    aria-invalid={invalid}
                    aria-describedby={invalid ? `${id}-error` : undefined}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="24 Rue Oberkampf, 75011 Paris"
                  />
                )}
              </FormField>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <FormField id="price" label="Price" hint="Leave empty for a free event">
                {({ id, className }) => (
                  <input
                    id={id}
                    inputMode="decimal"
                    className={className}
                    value={values.price}
                    onChange={(e) => set("price", e.target.value)}
                    placeholder="e.g. 22"
                  />
                )}
              </FormField>

              <FormField id="language" label="Language">
                {({ id, className }) => (
                  <select
                    id={id}
                    className={className}
                    value={values.language}
                    onChange={(e) => set("language", e.target.value as Language)}
                  >
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Bilingual">Bilingual</option>
                  </select>
                )}
              </FormField>
            </>
          ) : null}
        </ScreenBody>

        <div className="shrink-0 border-t border-border bg-card px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Button type="submit" className="h-12 w-full rounded-xl text-base">
            {step < 3 ? "Continue" : isEdit ? "Save changes" : "Publish event"}
          </Button>
        </div>
      </form>
    </>
  );
}
