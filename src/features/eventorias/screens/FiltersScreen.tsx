import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Chip } from "../components/Chip";
import { ScreenBody, ScreenHeader } from "../components/Shell";
import {
  activeFilterCount,
  CATEGORIES,
  EMPTY_FILTERS,
  type Category,
  type Filters,
} from "../types";

const DATES: { id: Filters["date"]; label: string }[] = [
  { id: "any", label: "Any date" },
  { id: "today", label: "Today" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "weekend", label: "This weekend" },
];

const LANGUAGES: { id: Filters["language"]; label: string }[] = [
  { id: "any", label: "Any" },
  { id: "English", label: "English" },
  { id: "French", label: "French" },
  { id: "Bilingual", label: "Bilingual" },
];

const BUDGETS: { id: Filters["budget"]; label: string }[] = [
  { id: "any", label: "Any" },
  { id: "free", label: "Free" },
  { id: "under20", label: "Under €20" },
  { id: "under40", label: "Under €40" },
];

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <div className="flex flex-wrap gap-2">{children}</div>
    </section>
  );
}

export function FiltersScreen({
  initial,
  resultCount,
  onClose,
  onApply,
}: {
  initial: Filters;
  resultCount: (f: Filters) => number;
  onClose: () => void;
  onApply: (f: Filters) => void;
}) {
  const [draft, setDraft] = useState<Filters>(initial);
  const count = activeFilterCount(draft);

  const toggleCategory = (c: Category) =>
    setDraft((d) => ({
      ...d,
      categories: d.categories.includes(c)
        ? d.categories.filter((x) => x !== c)
        : [...d.categories, c],
    }));

  return (
    <>
      <ScreenHeader
        title="Filters"
        subtitle={count > 0 ? `${count} active` : "No filters applied"}
        onBack={onClose}
        action={
          <button
            type="button"
            onClick={() => setDraft(EMPTY_FILTERS)}
            className="h-11 px-2 text-sm font-medium text-primary"
          >
            Reset
          </button>
        }
      />
      <ScreenBody className="space-y-7 px-4 py-5">
        <Group title="Date">
          {DATES.map((d) => (
            <Chip
              key={d.id}
              label={d.label}
              selected={draft.date === d.id}
              onClick={() => setDraft((prev) => ({ ...prev, date: d.id }))}
            />
          ))}
        </Group>

        <Group title="Category">
          {CATEGORIES.map((c) => (
            <Chip
              key={c}
              label={c}
              selected={draft.categories.includes(c)}
              onClick={() => toggleCategory(c)}
            />
          ))}
        </Group>

        <Group title="Language">
          {LANGUAGES.map((l) => (
            <Chip
              key={l.id}
              label={l.label}
              selected={draft.language === l.id}
              onClick={() => setDraft((prev) => ({ ...prev, language: l.id }))}
            />
          ))}
        </Group>

        <Group title="Budget">
          {BUDGETS.map((b) => (
            <Chip
              key={b.id}
              label={b.label}
              selected={draft.budget === b.id}
              onClick={() => setDraft((prev) => ({ ...prev, budget: b.id }))}
            />
          ))}
        </Group>
      </ScreenBody>
      <div className="shrink-0 border-t border-border bg-card px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Button className="h-12 w-full rounded-xl text-base" onClick={() => onApply(draft)}>
          Show {resultCount(draft)} results
        </Button>
      </div>
    </>
  );
}
