import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";
import food4 from "@/assets/food-4.jpg";
import food5 from "@/assets/food-5.jpg";

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  priceLevel: 1 | 2 | 3 | 4;
  distanceKm: number;
  vibe: string[];
  solPrice: number;
  // map coordinates as % of viewport for our stylized map
  x: number;
  y: number;
};

export const restaurants: Restaurant[] = [
  {
    id: "kaiyo",
    name: "Kaiyō Omakase",
    cuisine: "Japanese · Sushi",
    image: food1,
    rating: 4.9,
    priceLevel: 4,
    distanceKm: 0.8,
    vibe: ["Date night", "Chef's counter", "Quiet"],
    solPrice: 1.8,
    x: 32,
    y: 38,
  },
  {
    id: "voltron",
    name: "Voltron Burger Lab",
    cuisine: "Smash burgers · Bar",
    image: food2,
    rating: 4.7,
    priceLevel: 2,
    distanceKm: 1.2,
    vibe: ["Loud", "Late night", "Group"],
    solPrice: 0.42,
    x: 64,
    y: 28,
  },
  {
    id: "neon-noodle",
    name: "Neon Noodle Co.",
    cuisine: "Ramen · Izakaya",
    image: food3,
    rating: 4.8,
    priceLevel: 2,
    distanceKm: 0.5,
    vibe: ["Cozy", "Solo friendly", "Rainy day"],
    solPrice: 0.55,
    x: 48,
    y: 56,
  },
  {
    id: "forno-luna",
    name: "Forno Luna",
    cuisine: "Wood-fired pizza",
    image: food4,
    rating: 4.6,
    priceLevel: 3,
    distanceKm: 2.1,
    vibe: ["Family", "Patio", "Wine"],
    solPrice: 0.78,
    x: 22,
    y: 70,
  },
  {
    id: "calle-mar",
    name: "Calle del Mar",
    cuisine: "Mexican · Tacos",
    image: food5,
    rating: 4.8,
    priceLevel: 2,
    distanceKm: 1.5,
    vibe: ["Vibrant", "Mezcal bar", "Group"],
    solPrice: 0.35,
    x: 76,
    y: 64,
  },
];