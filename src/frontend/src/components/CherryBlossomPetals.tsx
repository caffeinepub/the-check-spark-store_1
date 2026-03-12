import React, { useMemo } from "react";

const PETAL_ROTATIONS = [0, 72, 144, 216, 288];

function PetalSvg() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      role="presentation"
      aria-hidden="true"
    >
      {PETAL_ROTATIONS.map((r) => (
        <ellipse
          key={r}
          cx="20"
          cy="12"
          rx="8"
          ry="12"
          fill={r === 144 || r === 216 ? "#f7b5ca" : "#f9c8d8"}
          opacity="0.85"
          transform={`rotate(${r} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="3" fill="#f5e6a3" />
    </svg>
  );
}

interface Petal {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function CherryBlossomPetals() {
  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${(i * 8.5) % 100}%`,
      size: 14 + (i % 5) * 6,
      duration: 8 + (i % 6) * 2,
      delay: -(i * 1.8),
      opacity: 0.4 + (i % 4) * 0.12,
    }));
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: "-60px",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `petalFloat ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          <PetalSvg />
        </div>
      ))}
    </div>
  );
}
