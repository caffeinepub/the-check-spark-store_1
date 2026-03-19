import { Star } from "lucide-react";
import React from "react";

// Generates a stable fake rating from a string seed
function seedRandom(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h) / 2147483648;
}

interface FakeRatingProps {
  seed: string;
  rating?: number;
  reviewCount?: number;
  className?: string;
}

export function FakeRating({
  seed,
  rating,
  reviewCount,
  className = "",
}: FakeRatingProps) {
  const r1 = seedRandom(seed);
  const r2 = seedRandom(`${seed}_count`);

  // Use explicit values if provided, otherwise generate from seed
  const roundedRating =
    rating !== undefined ? rating : Math.round((4.0 + r1 * 1.0) * 2) / 2;
  const count =
    reviewCount !== undefined ? reviewCount : 6 + Math.floor(r2 * 9);

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {stars.map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= roundedRating
                ? "fill-amber-400 text-amber-400"
                : star - 0.5 <= roundedRating
                  ? "fill-amber-200 text-amber-400"
                  : "fill-none text-amber-300"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">({count})</span>
    </div>
  );
}
