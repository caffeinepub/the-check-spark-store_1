import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, Package, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const PETAL_ROTATIONS = [0, 72, 144, 216, 288];

function BlossomDecor() {
  return (
    <svg
      viewBox="0 0 80 80"
      width="80"
      height="80"
      role="presentation"
      aria-hidden="true"
    >
      {PETAL_ROTATIONS.map((r) => (
        <ellipse
          key={r}
          cx="40"
          cy="18"
          rx="12"
          ry="20"
          fill="#e8a0b8"
          transform={`rotate(${r} 40 40)`}
        />
      ))}
      <circle cx="40" cy="40" r="5" fill="#f5e6a3" />
    </svg>
  );
}

export function ProductDetailPage() {
  const { productId } = useParams({ from: "/product/$productId" });
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProductById(BigInt(productId));
    },
    enabled: !!actor && !isFetching,
  });

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.addToCart(BigInt(productId), 1n);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Added to cart! 🌸");
    },
    onError: () => {
      toast.error("Please log in to add items to cart");
    },
  });

  if (isLoading) {
    return (
      <main className="min-h-screen p-6" data-ocid="product.loading_state">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-6 w-32 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        data-ocid="product.error_state"
      >
        <div className="text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-foreground mb-2">
            Product Not Found
          </h2>
          <Link to="/" data-ocid="product.link">
            <Button variant="outline" className="mt-4">
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-16">
      <div className="px-6 py-6 max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors"
          data-ocid="product.link"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-secondary/30 shadow-bloom">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl opacity-30">✨</span>
                </div>
              )}
            </div>
            <div
              className="absolute -bottom-4 -right-4 opacity-15 pointer-events-none"
              aria-hidden="true"
            >
              <BlossomDecor />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-2">
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              {product.name}
            </h1>
            <p className="text-3xl font-semibold text-primary mb-6">
              ₹{Number(product.price).toLocaleString()}
            </p>
            <p className="text-foreground/70 leading-relaxed mb-6">
              {product.description}
            </p>

            {product.inStock ? (
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base rounded-full shadow-bloom"
                onClick={() => addToCartMutation.mutate()}
                disabled={addToCartMutation.isPending}
                data-ocid="product.primary_button"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
              </Button>
            ) : (
              <Button
                disabled
                className="px-8 py-6 text-base rounded-full"
                data-ocid="product.primary_button"
              >
                Out of Stock
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
