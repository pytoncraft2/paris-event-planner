import { useMemo, useState } from "react";
import { BottomNav, type Tab } from "./components/BottomNav";
import { MobileShell } from "./components/Shell";
import { ORGANIZER_SEED_EVENTS, SEED_EVENTS } from "./data";
import { EventsScreen, type DemoMode } from "./screens/EventsScreen";
import { FiltersScreen } from "./screens/FiltersScreen";
import { EventDetailsScreen } from "./screens/EventDetailsScreen";
import { SignInGateScreen } from "./screens/SignInGateScreen";
import { CalendarSuccessScreen, PublishSuccessScreen } from "./screens/SuccessScreens";
import { ProfileScreen } from "./screens/ProfileScreen";
import { MyEventsScreen } from "./screens/MyEventsScreen";
import { EventFormScreen } from "./screens/EventFormScreen";
import {
  activeFilterCount,
  EMPTY_FILTERS,
  type Category,
  type EventItem,
  type Filters,
} from "./types";

/** Demo "today" so relative date filters line up with the simulated data. */
const TODAY = "2026-09-04";
const TOMORROW = "2026-09-05";
const WEEKEND = ["2026-09-05", "2026-09-06"];

type Screen =
  | { name: "events" }
  | { name: "filters" }
  | { name: "details"; event: EventItem }
  | { name: "signin"; event: EventItem }
  | { name: "calendarSuccess"; event: EventItem }
  | { name: "profile" }
  | { name: "myEvents" }
  | { name: "eventForm"; editing: EventItem | null }
  | { name: "publishSuccess"; event: EventItem; isEdit: boolean };

function matches(event: EventItem, filters: Filters, query: string, chip: Category | "All") {
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

export function EventoriasApp() {
  const [screen, setScreen] = useState<Screen>({ name: "events" });
  const [tab, setTab] = useState<Tab>("events");
  const [query, setQuery] = useState("");
  const [chip, setChip] = useState<Category | "All">("All");
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [demoMode, setDemoMode] = useState<DemoMode>("normal");
  const [notifications, setNotifications] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [myEvents, setMyEvents] = useState<EventItem[]>(ORGANIZER_SEED_EVENTS);

  const allEvents = useMemo(() => [...SEED_EVENTS, ...myEvents], [myEvents]);
  const visibleEvents = useMemo(
    () => allEvents.filter((e) => matches(e, filters, query, chip)),
    [allEvents, filters, query, chip],
  );

  const goTab = (next: Tab) => {
    setTab(next);
    setScreen(next === "events" ? { name: "events" } : { name: "profile" });
  };

  const addToCalendar = (event: EventItem) => {
    if (signedIn) setScreen({ name: "calendarSuccess", event });
    else setScreen({ name: "signin", event });
  };

  const showBottomNav =
    screen.name === "events" || screen.name === "profile" || screen.name === "myEvents";

  return (
    <MobileShell>
      {screen.name === "events" && (
        <EventsScreen
          events={visibleEvents}
          query={query}
          onQueryChange={setQuery}
          activeCategory={chip}
          onCategoryChange={setChip}
          filterCount={activeFilterCount(filters)}
          onOpenFilters={() => setScreen({ name: "filters" })}
          onSelectEvent={(event) => setScreen({ name: "details", event })}
          demoMode={demoMode}
          onRetry={() => setDemoMode("normal")}
          onResetFilters={() => {
            setFilters(EMPTY_FILTERS);
            setChip("All");
            setQuery("");
            setDemoMode("normal");
          }}
        />
      )}

      {screen.name === "filters" && (
        <FiltersScreen
          initial={filters}
          resultCount={(f) => allEvents.filter((e) => matches(e, f, query, chip)).length}
          onClose={() => setScreen({ name: "events" })}
          onApply={(f) => {
            setFilters(f);
            setScreen({ name: "events" });
          }}
        />
      )}

      {screen.name === "details" && (
        <EventDetailsScreen
          event={screen.event}
          onBack={() => setScreen({ name: "events" })}
          onAddToCalendar={() => addToCalendar(screen.event)}
        />
      )}

      {screen.name === "signin" && (
        <SignInGateScreen
          onBack={() => setScreen({ name: "details", event: screen.event })}
          onSignIn={() => {
            setSignedIn(true);
            setScreen({ name: "calendarSuccess", event: screen.event });
          }}
          onNotNow={() => setScreen({ name: "details", event: screen.event })}
        />
      )}

      {screen.name === "calendarSuccess" && (
        <CalendarSuccessScreen
          event={screen.event}
          onDone={() => setScreen({ name: "events" })}
          onBackToEvents={() => setScreen({ name: "events" })}
        />
      )}

      {screen.name === "profile" && (
        <ProfileScreen
          notifications={notifications}
          onNotificationsChange={setNotifications}
          onOpenMyEvents={() => setScreen({ name: "myEvents" })}
          myEventsCount={myEvents.length}
          demoMode={demoMode}
          onDemoModeChange={setDemoMode}
        />
      )}

      {screen.name === "myEvents" && (
        <MyEventsScreen
          events={myEvents}
          onBack={() => setScreen({ name: "profile" })}
          onCreate={() => setScreen({ name: "eventForm", editing: null })}
          onEdit={(event) => setScreen({ name: "eventForm", editing: event })}
          onCancelEvent={(id) => setMyEvents((list) => list.filter((e) => e.id !== id))}
        />
      )}

      {screen.name === "eventForm" && (
        <EventFormScreen
          editing={screen.editing}
          onBack={() => setScreen({ name: "myEvents" })}
          onSubmit={(event) => {
            const isEdit = screen.editing !== null;
            setMyEvents((list) =>
              isEdit ? list.map((e) => (e.id === event.id ? event : e)) : [event, ...list],
            );
            setScreen({ name: "publishSuccess", event, isEdit });
          }}
        />
      )}

      {screen.name === "publishSuccess" && (
        <PublishSuccessScreen
          event={screen.event}
          isEdit={screen.isEdit}
          onViewMyEvents={() => setScreen({ name: "myEvents" })}
        />
      )}

      {showBottomNav && <BottomNav active={tab} onChange={goTab} />}
    </MobileShell>
  );
}
