import { useEffect, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "../components/FormField";
import { ScreenBody, ScreenHeader } from "../components/Shell";
import type { EventItem, Language } from "../types";
import { PROFILE } from "../data";

type FormValues = {
  title: string;
  description: string;
  date: string;
  time: string;
  address: string;
  price: string;
  language: Language;
};

type Errors = Partial<Record<"title" | "date" | "address", string>>;

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

export function EventFormScreen({
  editing,
  onBack,
  onSubmit,
}: {
  editing: EventItem | null;
  onBack: () => void;
  onSubmit: (event: EventItem) => void;
}) {
  const isEdit = editing !== null;
  const [values, setValues] = useState<FormValues>(() => toValues(editing));
  const [errors, setErrors] = useState<Errors>({});
  const [imagePreview, setImagePreview] = useState<string | undefined>(editing?.image);
  const objectUrlRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () => () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    },
    [],
  );

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!values.title.trim()) next.title = "Title is required";
    if (!values.date.trim()) next.date = "Date is required";
    if (!values.address.trim()) next.address = "Address is required";
    setErrors(next);
    const firstInvalid = (["title", "date", "address"] as const).find((k) => next[k]);
    if (firstInvalid) {
      const el = document.getElementById(firstInvalid);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }

    const price = Number.parseFloat(values.price.replace(",", "."));
    onSubmit({
      id: editing?.id ?? `ev-${Date.now()}`,
      title: values.title.trim(),
      // Category is not collected in this form: stay neutral.
      category: editing?.category ?? "Event",
      date: values.date,
      time: values.time || "19:00",
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

  return (
    <>
      <ScreenHeader title={isEdit ? "Edit event" : "Create event"} onBack={onBack} />
      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        <ScreenBody className="space-y-5 px-4 py-5">
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

          <FormField id="date" label="Date" required error={errors.date}>
            {({ id, invalid, className }) => (
              <input
                id={id}
                type="date"
                className={className}
                value={values.date}
                aria-invalid={invalid}
                aria-describedby={invalid ? `${id}-error` : undefined}
                onChange={(e) => set("date", e.target.value)}
              />
            )}
          </FormField>

          <FormField id="time" label="Time">
            {({ id, className }) => (
              <input
                id={id}
                type="time"
                className={className}
                value={values.time}
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

          <FormField id="price" label="Price" hint="Leave empty for a free event">
            {({ id, className }) => (
              <input
                id={id}
                inputMode="decimal"
                className={className}
                value={values.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="€ 0"
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

          <div>
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
        </ScreenBody>

        <div className="shrink-0 border-t border-border bg-card px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Button type="submit" className="h-12 w-full rounded-xl text-base">
            {isEdit ? "Save changes" : "Publish event"}
          </Button>
        </div>
      </form>
    </>
  );
}
