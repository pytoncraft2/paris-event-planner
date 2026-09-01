import cruise from "@/assets/event-cruise.jpg";
import food from "@/assets/event-food.jpg";
import impressionism from "@/assets/event-impressionism.jpg";
import jazz from "@/assets/event-jazz.jpg";
import louvre from "@/assets/event-louvre.jpg";
import streetart from "@/assets/event-streetart.jpg";
import type { EventItem } from "./types";

export const SEED_EVENTS: EventItem[] = [
  {
    id: "ev-impressionism",
    title: "Impressionism After Hours",
    category: "Culture",
    date: "2026-09-04",
    time: "19:30",
    neighborhood: "Paris 3e",
    venue: "Musée Grand Marais",
    address: "12 Rue de Thorigny, 75003 Paris",
    language: "English",
    price: 22,
    description:
      "An evening walk-through of the Impressionist collection with an English-speaking guide. Small groups, quiet rooms and a glass of wine in the courtyard afterwards. Doors open 15 minutes before the start.",
    organizer: "Grand Marais Museum",
    organizerRole: "Cultural venue",
    image: impressionism,
  },
  {
    id: "ev-jazz",
    title: "Jazz at Caveau de la Huchette",
    category: "Music",
    date: "2026-09-04",
    time: "21:00",
    neighborhood: "Paris 5e",
    venue: "Caveau de la Huchette",
    address: "5 Rue de la Huchette, 75005 Paris",
    language: "Bilingual",
    price: 14,
    description:
      "Live swing and bebop in a 16th-century stone cellar off Saint-Michel. Three sets a night, dancing encouraged, no dress code. Arrive early for a seat near the stage.",
    organizer: "Huchette Live",
    organizerRole: "Music venue",
    image: jazz,
  },
  {
    id: "ev-cruise",
    title: "Midnight Eiffel & Seine Cruise",
    category: "Experience",
    date: "2026-09-05",
    time: "23:00",
    neighborhood: "Paris 7e",
    venue: "Port de la Bourdonnais",
    address: "Port de la Bourdonnais, 75007 Paris",
    language: "English",
    price: 29,
    description:
      "A one-hour night cruise past the Eiffel Tower, Notre-Dame and the Louvre riverfront, with live English commentary. Heated indoor deck and an open top deck.",
    organizer: "Seine Nocturne",
    organizerRole: "Tour operator",
    image: cruise,
  },
  {
    id: "ev-streetart",
    title: "Street Art Walk in Belleville",
    category: "Tour",
    date: "2026-09-05",
    time: "11:00",
    neighborhood: "Paris 20e",
    venue: "Belleville Métro exit",
    address: "Bd de Belleville, 75020 Paris",
    language: "English",
    price: 0,
    description:
      "A free two-hour walking tour through Belleville's murals and paste-ups with a local artist. Tips welcome, comfortable shoes recommended. Ends near Parc de Belleville.",
    organizer: "Paris Walls Collective",
    organizerRole: "Community organizer",
    image: streetart,
  },
  {
    id: "ev-louvre",
    title: "Louvre Evening English Tour",
    category: "Tour",
    date: "2026-09-06",
    time: "18:00",
    neighborhood: "Paris 1er",
    venue: "Louvre Museum, Pyramid entrance",
    address: "Rue de Rivoli, 75001 Paris",
    language: "English",
    price: 38,
    description:
      "Skip the daytime crowds. A guided route through the Denon wing covering the Mona Lisa, the Winged Victory and the Italian galleries, in English, with 90 minutes of free time after.",
    organizer: "Rive Droite Guides",
    organizerRole: "Licensed guide",
    image: louvre,
  },
  {
    id: "ev-market",
    title: "Marché d'Aligre Tasting Morning",
    category: "Food",
    date: "2026-09-06",
    time: "10:00",
    neighborhood: "Paris 12e",
    venue: "Marché d'Aligre",
    address: "Place d'Aligre, 75012 Paris",
    language: "English",
    price: 26,
    description:
      "Taste your way through one of the oldest markets in Paris: cheese, charcuterie, bread and coffee, guided in English by a local cook. Six stops, roughly two hours.",
    organizer: "Table d'Aligre",
    organizerRole: "Food host",
    image: food,
  },
  {
    id: "ev-run",
    title: "Sunrise Run along the Canal",
    category: "Sport",
    date: "2026-09-07",
    time: "07:30",
    neighborhood: "Paris 10e",
    venue: "Canal Saint-Martin",
    address: "Quai de Valmy, 75010 Paris",
    language: "English",
    price: 0,
    description:
      "A relaxed 7 km group run along Canal Saint-Martin at an easy conversational pace. All levels welcome, coffee together at the end.",
    organizer: "Paris Morning Runners",
    organizerRole: "Community organizer",
  },
];

export const ORGANIZER_SEED_EVENTS: EventItem[] = [
  {
    id: "ev-mine-1",
    title: "Rooftop Sunset Sessions",
    category: "Music",
    date: "2026-09-12",
    time: "19:00",
    neighborhood: "Paris 11e",
    venue: "Toit d'Oberkampf",
    address: "24 Rue Oberkampf, 75011 Paris",
    language: "English",
    price: 18,
    description:
      "A DJ set on an Oberkampf rooftop with a view over the eastern skyline. Limited capacity, English-speaking crew.",
    organizer: "Camille Rey",
    organizerRole: "Organizer",
    publishedByMe: true,
  },
  {
    id: "ev-mine-2",
    title: "Beginner Photography Walk",
    category: "Experience",
    date: "2026-09-19",
    time: "16:30",
    neighborhood: "Paris 4e",
    venue: "Île Saint-Louis",
    address: "Quai de Bourbon, 75004 Paris",
    language: "English",
    price: 0,
    description:
      "Bring any camera or a phone. Two hours of composition basics while walking the islands, taught in English.",
    organizer: "Camille Rey",
    organizerRole: "Organizer",
    publishedByMe: true,
  },
];

export const PROFILE = {
  name: "Camille Rey",
  email: "camille.rey@eventorias.app",
  role: "Event organizer",
};
