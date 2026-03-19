export interface StaticProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
}

export const STATIC_PRODUCTS: StaticProduct[] = [
  {
    id: "static-jhumka-1",
    name: "Blue Crystal Jhumkas",
    description:
      "Elegant silver jhumkas with sparkling blue crystal drops and crystal-studded tops",
    price: 129,
    originalPrice: 150,
    category: "earrings",
    imageUrl: "/assets/uploads/IMG_20250621_174612-1.jpg",
    inStock: true,
    rating: 4.5,
    reviewCount: 6,
  },
  {
    id: "static-jhumka-2",
    name: "Teal Crystal Jhumkas",
    description:
      "Oxidised silver jhumkas with intricate mandala top and teal crystal bead drops",
    price: 99,
    originalPrice: 120,
    category: "earrings",
    imageUrl: "/assets/uploads/IMG_20250621_173810-2.jpg",
    inStock: true,
    rating: 3.9,
    reviewCount: 13,
  },
  {
    id: "static-jhumka-3",
    name: "Multicolor Beaded Jhumkas",
    description:
      "Vibrant festive jhumkas with multicolor beaded tops and rhinestone-studded bell",
    price: 79,
    originalPrice: 110,
    category: "earrings",
    imageUrl: "/assets/uploads/IMG_20250621_174715-3.jpg",
    inStock: true,
    rating: 4.0,
    reviewCount: 8,
  },
  {
    id: "static-jhumka-4",
    name: "Purple Crystal Jhumkas",
    description:
      "Oxidised silver jhumkas with mandala disc tops and purple crystal bead drops",
    price: 99,
    originalPrice: 120,
    category: "earrings",
    imageUrl: "/assets/uploads/IMG_20250621_173707-4.jpg",
    inStock: true,
    rating: 3.7,
    reviewCount: 5,
  },
];
