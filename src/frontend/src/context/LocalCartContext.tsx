import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "chic-spark-local-cart";

export interface LocalCartItem {
  productId: string;
  quantity: number;
}

interface LocalCartContextValue {
  localCartItems: LocalCartItem[];
  localCartCount: number;
  addLocalItem: (productId: string) => void;
  removeLocalItem: (productId: string) => void;
  clearLocalCart: () => void;
}

const LocalCartContext = createContext<LocalCartContextValue | null>(null);

export function LocalCartProvider({ children }: { children: React.ReactNode }) {
  const [localCartItems, setLocalCartItems] = useState<LocalCartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localCartItems));
  }, [localCartItems]);

  const localCartCount = localCartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const addLocalItem = useCallback((productId: string) => {
    setLocalCartItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  }, []);

  const removeLocalItem = useCallback((productId: string) => {
    setLocalCartItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearLocalCart = useCallback(() => {
    setLocalCartItems([]);
  }, []);

  return (
    <LocalCartContext.Provider
      value={{
        localCartItems,
        localCartCount,
        addLocalItem,
        removeLocalItem,
        clearLocalCart,
      }}
    >
      {children}
    </LocalCartContext.Provider>
  );
}

export function useLocalCart() {
  const ctx = useContext(LocalCartContext);
  if (!ctx)
    throw new Error("useLocalCart must be used within LocalCartProvider");
  return ctx;
}
