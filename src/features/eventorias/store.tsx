import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { ORGANIZER_SEED_EVENTS, SEED_EVENTS } from "./data";
import { EMPTY_FILTERS, type Category, type EventItem, type Filters } from "./types";

/** Demo "today" so relative date filters line up with the simulated data. */
const TODAY = "2026-09-04";
const TOMORROW = "2026-09-05";
const WEEKEND = ["2026-09-05", "2026-09-06"];

const CALENDAR_IDS_KEY = "eventorias.calendarEventIds";
const CALENDAR_CHANGE = "eventorias-calendar-change";
const EMPTY_CALENDAR_IDS: string[] = [];
let cachedCalendarIds: string[] = EMPTY_CALENDAR_IDS;

function parseCalendarEventIds(): string[] {
  if (typeof window === "undefined") return EMPTY_CALENDAR_IDS;
  try {
    const raw = sessionStorage.getItem(CALENDAR_IDS_KEY);
    if (!raw) return EMPTY_CALENDAR_IDS;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY_CALENDAR_IDS;
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return EMPTY_CALENDAR_IDS;
  }
}

function readCalendarEventIds(): string[] {
  const next = parseCalendarEventIds();
  if (
    next.length === cachedCalendarIds.length &&
    next.every((id, i) => id === cachedCalendarIds[i])
  ) {
    return cachedCalendarIds;
  }
  cachedCalendarIds = next.length === 0 ? EMPTY_CALENDAR_IDS : next;
  return cachedCalendarIds;
}

function writeCalendarEventIds(ids: string[]) {
  cachedCalendarIds = ids.length === 0 ? EMPTY_CALENDAR_IDS : ids;
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CALENDAR_IDS_KEY, JSON.stringify(cachedCalendarIds));
  } catch {
    // Prototype: ignore quota / private-mode failures.
  }
  window.dispatchEvent(new Event(CALENDAR_CHANGE));
}

function subscribeCalendarIds(onChange: () => void) {
  window.addEventListener(CALENDAR_CHANGE, onChange);
  return () => window.removeEventListener(CALENDAR_CHANGE, onChange);
}

function getServerCalendarIds() {
  return EMPTY_CALENDAR_IDS;
}

export function matches(
  event: EventItem,
  filters: Filters,
  query: string,
  chip: Category | "All",
) {
  const q = query.trim().toLowerCase();
  if (
    q &&
    ![event.title, event.neighborhood, event.venue, event.category].some((v) =>
      v.toLowerCase().includes(q),
    )
  ) {
    return false;
  }
  if (chip !== "All" && event.category !== chip) return false;
  if (filters.categories.length > 0 && !filters.categories.includes(event.category))
    return false;
  if (filters.language !== "any" && event.language !== filters.language) return false;
  if (filters.date === "today" && event.date !== TODAY) return false;
  if (filters.date === "tomorrow" && event.date !== TOMORROW) return false;
  if (filters.date === "weekend" && !WEEKEND.includes(event.date)) return false;
  if (filters.budget === "free" && event.price !== 0) return false;
  if (filters.budget === "under20" && event.price >= 20) return false;
  if (filters.budget === "under40" && event.price >= 40) return false;
  return true;
}

type Store = {
  query: string;
  setQuery: (v: string) => void;
  chip: Category | "All";
  setChip: (c: Category | "All") => void;
  filters: Filters;
  setFilters: (f: Filters) => void;
  signedIn: boolean;
  setSignedIn: (v: boolean) => void;
  notifications: boolean;
  setNotifications: (v: boolean) => void;
  myEvents: EventItem[];
  allEvents: EventItem[];
  visibleEvents: EventItem[];
  findEvent: (id: string) => EventItem | undefined;
  upsertEvent: (event: EventItem) => void;
  cancelEvent: (id: string) => void;
  resetSearch: () => void;
  resetAll: () => void;
  /** Event most recently added to the calendar; feeds the canonical success screen. */
  lastCalendarEvent: EventItem | null;
  setLastCalendarEvent: (e: EventItem | null) => void;
  /** Event ids added to the simulated calendar during this session. */
  calendarEventIds: string[];
  isInCalendar: (id: string) => boolean;
  addToCalendar: (event: EventItem) => void;
  /** Most recent publish/save result; feeds the canonical success screen. */
  lastPublish: { event: EventItem; isEdit: boolean } | null;
  setLastPublish: (v: { event: EventItem; isEdit: boolean } | null) => void;
};

const EventoriasContext = createContext<Store | null>(null);

export function EventoriasProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [chip, setChip] = useState<Category | "All">("All");
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [signedIn, setSignedIn] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [myEvents, setMyEvents] = useState<EventItem[]>(ORGANIZER_SEED_EVENTS);
  const [lastCalendarEvent, setLastCalendarEvent] = useState<EventItem | null>(null);
  const calendarEventIds = useSyncExternalStore(
    subscribeCalendarIds,
    readCalendarEventIds,
    getServerCalendarIds,
  );
  const [lastPublish, setLastPublish] = useState<{
    event: EventItem;
    isEdit: boolean;
  } | null>(null);

  const allEvents = useMemo(() => [...SEED_EVENTS, ...myEvents], [myEvents]);
  const visibleEvents = useMemo(
    () => allEvents.filter((e) => matches(e, filters, query, chip)),
    [allEvents, filters, query, chip],
  );

  const value: Store = {
    query,
    setQuery,
    chip,
    setChip,
    filters,
    setFilters,
    signedIn,
    setSignedIn,
    notifications,
    setNotifications,
    myEvents,
    allEvents,
    visibleEvents,
    findEvent: (id) => allEvents.find((e) => e.id === id),
    upsertEvent: (event) =>
      setMyEvents((list) =>
        list.some((e) => e.id === event.id)
          ? list.map((e) => (e.id === event.id ? event : e))
          : [event, ...list],
      ),
    cancelEvent: (id) => setMyEvents((list) => list.filter((e) => e.id !== id)),
    resetSearch: () => {
      setFilters(EMPTY_FILTERS);
      setChip("All");
      setQuery("");
    },
    resetAll: () => {
      setFilters(EMPTY_FILTERS);
      setChip("All");
      setQuery("");
      setSignedIn(false);
      setNotifications(true);
      setMyEvents(ORGANIZER_SEED_EVENTS);
      setLastCalendarEvent(null);
      writeCalendarEventIds([]);
      setLastPublish(null);
    },
    lastCalendarEvent,
    setLastCalendarEvent,
    calendarEventIds,
    isInCalendar: (id) => calendarEventIds.includes(id),
    addToCalendar: (event) => {
      setLastCalendarEvent(event);
      const ids = readCalendarEventIds();
      writeCalendarEventIds(ids.includes(event.id) ? ids : [...ids, event.id]);
    },
    lastPublish,
    setLastPublish,
  };

  return (
    <EventoriasContext.Provider value={value}>{children}</EventoriasContext.Provider>
  );
}

export function useEventorias(): Store {
  const ctx = useContext(EventoriasContext);
  if (!ctx) throw new Error("useEventorias must be used inside EventoriasProvider");
  return ctx;
}
