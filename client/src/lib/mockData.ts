import { Car, Battery, Fuel, Gauge, Users, Star } from "lucide-react";
import porsche911 from "@assets/2025_Porsche_911_1765266212934.jpg";
import audietron from "@assets/Audi_e-tron_GT_RS-01_1765266212935.jpg";
import gclass from "@assets/Mercedes-Benz_G-Class_1765266212936.jpg";
import gclass2 from "@assets/Mercedes-Benz_G-Class22_1765266212936.jpg";
import carrera from "@assets/carrera-s-cabrio-front_1765266212935.jpg";

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price_per_day: number;
  category: string;
  image: string;
  transmission: string;
  fuel: string;
  seats: number;
  rating: number;
  reviews: number;
  available: boolean;
  features: string[];
}

export const vehicles: Vehicle[] = [
  {
    id: 1,
    brand: "Tesla",
    model: "Model Y Performance",
    year: 2024,
    price_per_day: 129,
    category: "SUV",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000",
    transmission: "Auto",
    fuel: "Electric",
    seats: 5,
    rating: 4.9,
    reviews: 128,
    available: true,
    features: ["Autopilot", "Long Range", "Premium Audio"]
  },
  {
    id: 2,
    brand: "Porsche",
    model: "911 Carrera",
    year: 2023,
    price_per_day: 350,
    category: "Sports",
    image: porsche911,
    transmission: "Auto",
    fuel: "Petrol",
    seats: 4,
    rating: 5.0,
    reviews: 84,
    available: true,
    features: ["Sport Chrono", "Leather Interior", "Convertible"]
  },
  {
    id: 3,
    brand: "Mercedes-Benz",
    model: "G-Class",
    year: 2023,
    price_per_day: 400,
    category: "SUV",
    image: gclass,
    transmission: "Auto",
    fuel: "Petrol",
    seats: 5,
    rating: 4.8,
    reviews: 215,
    available: true,
    features: ["4x4", "Luxury Interior", "Sunroof"]
  },
  {
    id: 4,
    brand: "BMW",
    model: "M4 Competition",
    year: 2024,
    price_per_day: 280,
    category: "Coupe",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1000",
    transmission: "Auto",
    fuel: "Petrol",
    seats: 4,
    rating: 4.9,
    reviews: 92,
    available: true,
    features: ["Carbon Pack", "Laser Lights", "Head-up Display"]
  },
  {
    id: 5,
    brand: "Range Rover",
    model: "Autobiography",
    year: 2024,
    price_per_day: 320,
    category: "SUV",
    image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=1000",
    transmission: "Auto",
    fuel: "Hybrid",
    seats: 5,
    rating: 4.7,
    reviews: 156,
    available: true,
    features: ["Massage Seats", "Fridge", "Rear Entertainment"]
  },
  {
    id: 6,
    brand: "Audi",
    model: "RS e-tron GT",
    year: 2024,
    price_per_day: 290,
    category: "Sedan",
    image: audietron,
    transmission: "Auto",
    fuel: "Electric",
    seats: 5,
    rating: 4.9,
    reviews: 73,
    available: true,
    features: ["Fast Charging", "Bang & Olufsen", "Panoramic Roof"]
  },
  {
    id: 7,
    brand: "Mercedes-Benz",
    model: "G-Class AMG",
    year: 2024,
    price_per_day: 450,
    category: "SUV",
    image: gclass2,
    transmission: "Auto",
    fuel: "Petrol",
    seats: 5,
    rating: 4.9,
    reviews: 142,
    available: true,
    features: ["Night Package", "Burmester Sound", "Massage Seats"]
  },
  {
    id: 8,
    brand: "Porsche",
    model: "911 Cabriolet",
    year: 2024,
    price_per_day: 380,
    category: "Sports",
    image: carrera,
    transmission: "Auto",
    fuel: "Petrol",
    seats: 4,
    rating: 5.0,
    reviews: 65,
    available: true,
    features: ["Convertible Top", "Sport Exhaust", "Bose Audio"]
  }
];
