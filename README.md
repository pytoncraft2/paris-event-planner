# Paris Event Navigator

Create a polished mobile-first web prototype called Eventorias for English-speaking tourists in Paris and local event organizers. Use React/TypeScript/Tailwind/shadcn-ui. No backend, Supabase, real auth, real calendar API, geolocation or persistence: simulate everything with local state and realistic data.

Visual direction: Inter, teal #0B6E78, warm background #F4F2EF, white cards, subtle #E8E6E2 borders, dark text #141412, secondary #6B6966, 12px radii, minimal shadows, accessible contrast, 44px touch targets, no gradients/glassmorphism. Serious, calm, contemporary travel product.

Responsive requirement is critical: real mobile app layout, not a fake fixed phone frame. Full viewport on phones; desktop centered max-width about 430px. No horizontal page overflow or layout jumping. Stable header/bottom navigation, only intended content scrolls. Test around 320/375/390/412/430px.

Bottom navigation has ONLY Events and Profile.

Tourist flow: Events → Filters → Filtered results → Event Details → Add to calendar → Sign-in gate → Calendar success.
Events screen: “What’s happening in Paris?”, Paris location hint, search, category chips All/Music/Culture/Experience/Tour/Food/Sport, Filters action, event count, clickable cards with image/title/date/time/neighborhood/language/price. Use realistic Paris examples such as Impressionism After Hours (€22, English, Paris 3e), Jazz at Caveau de la Huchette (€14), Midnight Eiffel & Seine Cruise (€29), Street Art Walk (Free), Louvre Evening English Tour (€38).
Filters: Date, Category multi-select, Language, Budget, Reset, Show results, active count. Include dedicated Empty Results and Network Error states, but do not trigger them from normal category choices.
Event Details: image, category, title, date, time, language, price, venue, full address, description, organizer row. Primary full-width CTA “Add to calendar”. No ticket purchasing.
Sign-in gate: Continue with Google, Continue with email, Not now. No Apple. No reminder promise.
Calendar success: “Added to your calendar”, event summary, Done/Back to Events.

Organizer flow: Profile → My Events → Create/Edit Event → validation → Publication success → My Events.
Profile: name, email, organizer indication, notifications toggle, My Events row.
My Events: published cards, Edit, Cancel, Create event, cancel confirmation.
Create/Edit form: Title*, Description, Date*, Time, Address*, Price, Language, Image placeholder. Inline errors directly under missing Title/Date/Address with error borders. Publish event / Save changes. If category is not collected, use neutral category “Event”, never auto-assign Music.
Publication success: “Event published”, View My Events, new event appears in simulated list.

Also include demo Loading, Empty Results, and Network Error with Retry states.
Keep code maintainable with reusable EventCard, Chip, BottomNav, FormField, EmptyState, ErrorState components. Do not add favorites, chat, social feed, recommendations, analytics, advanced maps/routes or ticket marketplace. Make both journeys clickable end-to-end and portfolio-ready.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://paris-event-planner.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ed2eaa5b-64b3-4785-8579-e831953e4189).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
