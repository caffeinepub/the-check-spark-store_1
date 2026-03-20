import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ShoppingBag, X } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import { toast } from "sonner";
import type { Category } from "../backend.d";
import { FakeRating } from "../components/FakeRating";
import { useLocalCart } from "../context/LocalCartContext";
import { STATIC_PRODUCTS, type StaticProduct } from "../data/staticProducts";
import { useActor } from "../hooks/useActor";

const CATEGORY_LABELS: Record<string, string> = {
  allJewellery: "All Jewellery",
  necklaces: "Necklaces",
  earrings: "Earrings",
  bracelets: "Bracelets",
  anklets: "Anklets",
  hairAccessories: "Hair Accessories",
  bags: "Bags",
  customize: "Customize",
  giftHampers: "Gift Hampers",
  otherAccessories: "Other Accessories",
};

const CATEGORY_EMOJIS: Record<string, string> = {
  allJewellery: "✨",
  necklaces: "📿",
  earrings: "💎",
  bracelets: "🌸",
  anklets: "🌺",
  hairAccessories: "🎀",
  bags: "👜",
  customize: "🎨",
  giftHampers: "🎁",
  otherAccessories: "💫",
};

const SAMPLE_PRODUCTS = [
  {
    id: "sp1",
    name: "Cherry Blossom Necklace",
    price: "₹1,299",
    desc: "Delicate 18k gold chain with floral pendant",
  },
  {
    id: "sp2",
    name: "Pearl Drop Earrings",
    price: "₹849",
    desc: "Freshwater pearl studs with gold setting",
  },
  {
    id: "sp3",
    name: "Crystal Charm Bracelet",
    price: "₹999",
    desc: "Swarovski crystals on rose gold chain",
  },
];

const SKELETON_IDS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];

function getStaticProducts(categoryId: string): StaticProduct[] {
  if (categoryId === "allJewellery") return STATIC_PRODUCTS;
  return STATIC_PRODUCTS.filter((p) => p.category === categoryId);
}

export function CategoryPage() {
  const { categoryId } = useParams({ from: "/category/$categoryId" });
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const { addLocalItem } = useLocalCart();
  const [selectedProduct, setSelectedProduct] = useState<StaticProduct | null>(
    null,
  );
  const [dialogImageIdx, setDialogImageIdx] = useState(0);

  const staticProducts = getStaticProducts(categoryId);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: async () => {
      if (!actor) return [];
      if (categoryId === "allJewellery") {
        return actor.getAllProducts();
      }
      const cat = categoryId as Category;
      return actor.getProductsByCategory(cat);
    },
    enabled: !!actor && !isFetching,
  });

  const addToCartMutation = useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error("Not connected");
      await actor.addToCart(productId, 1n);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Added to cart! 🌸");
    },
    onError: () => {
      toast.error("Please log in to add items to cart");
    },
  });

  const handleAddLocalToCart = (product: StaticProduct) => {
    addLocalItem(product.id);
    toast.success("Added to cart! 🌸");
  };

  const openProductDialog = (product: StaticProduct) => {
    setSelectedProduct(product);
    setDialogImageIdx(0);
  };

  const label = CATEGORY_LABELS[categoryId] || categoryId;
  const emoji = CATEGORY_EMOJIS[categoryId] || "✨";
  const hasProducts =
    (products && products.length > 0) || staticProducts.length > 0;

  return (
    <main className="min-h-screen pb-16">
      <div className="bg-gradient-to-r from-secondary/40 to-accent/10 border-b border-border px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-4 transition-colors"
          data-ocid="category.link"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{emoji}</span>
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              {label}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Handcrafted with love & care 🌸
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {isLoading ? (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
            data-ocid="category.loading_state"
          >
            {SKELETON_IDS.map((sk) => (
              <div
                key={sk}
                className="bg-card rounded-2xl overflow-hidden border border-border"
              >
                <Skeleton className="aspect-square w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : hasProducts ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Static products */}
            {staticProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                data-ocid={`category.item.${idx + 1}`}
              >
                <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-bloom hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                  <button
                    type="button"
                    className="w-full text-left cursor-pointer"
                    onClick={() => openProductDialog(product)}
                    aria-label={`View ${product.name}`}
                  >
                    <div className="aspect-square bg-secondary/30 overflow-hidden relative">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow">
                        SALE
                      </span>
                      {product.images && product.images.length > 1 && (
                        <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                          {product.images.length} photos
                        </span>
                      )}
                    </div>
                  </button>
                  <div className="p-4">
                    <button
                      type="button"
                      className="w-full text-left"
                      onClick={() => openProductDialog(product)}
                    >
                      <h3 className="font-serif font-semibold text-foreground text-sm leading-tight hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </button>
                    <FakeRating
                      seed={product.id}
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      className="mt-1"
                    />
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-primary font-semibold text-sm">
                        ₹{product.price}
                      </span>
                      <span className="text-muted-foreground text-xs line-through">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-3 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-xs rounded-lg"
                      onClick={() => handleAddLocalToCart(product)}
                      data-ocid={`category.button.${idx + 1}`}
                    >
                      <ShoppingBag className="w-3 h-3 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Backend products */}
            {products?.map((product, idx) => (
              <motion.div
                key={product.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: (staticProducts.length + idx) * 0.06,
                  duration: 0.4,
                }}
                data-ocid={`category.item.${staticProducts.length + idx + 1}`}
              >
                <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-bloom hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                  <Link
                    to="/product/$productId"
                    params={{ productId: product.id.toString() }}
                  >
                    <div className="aspect-square bg-secondary/30 overflow-hidden">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-5xl opacity-40">{emoji}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link
                      to="/product/$productId"
                      params={{ productId: product.id.toString() }}
                    >
                      <h3 className="font-serif font-semibold text-foreground text-sm leading-tight hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <FakeRating seed={product.id.toString()} className="mt-1" />
                    <p className="text-primary font-semibold mt-1">
                      ₹{Number(product.price).toLocaleString()}
                    </p>
                    {!product.inStock && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        Out of Stock
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      className="w-full mt-3 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-xs rounded-lg"
                      onClick={() => addToCartMutation.mutate(product.id)}
                      disabled={!product.inStock || addToCartMutation.isPending}
                      data-ocid={`category.button.${staticProducts.length + idx + 1}`}
                    >
                      <ShoppingBag className="w-3 h-3 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-20"
            data-ocid="category.empty_state"
          >
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">{emoji}</div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                Coming Soon to {label}
              </h2>
              <p className="text-muted-foreground">
                Our artisans are crafting beautiful pieces for you
              </p>
            </div>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-5 w-full max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {SAMPLE_PRODUCTS.map((sample, idx) => (
                <div
                  key={sample.id}
                  className="bg-card rounded-2xl overflow-hidden border border-border/60 opacity-60"
                  data-ocid={`category.item.${idx + 1}`}
                >
                  <div className="aspect-square bg-secondary/30 flex items-center justify-center">
                    <span className="text-4xl">{emoji}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-semibold text-foreground text-sm">
                      {sample.name}
                    </h3>
                    <p className="text-primary font-semibold mt-1 text-sm">
                      {sample.price}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {sample.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      {/* Product Detail Dialog */}
      <Dialog
        open={selectedProduct !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedProduct(null);
        }}
      >
        <DialogContent
          className="max-w-md rounded-2xl p-0 overflow-hidden border-border"
          data-ocid="category.dialog"
        >
          {selectedProduct &&
            (() => {
              const allImages = selectedProduct.images ?? [
                selectedProduct.imageUrl,
              ];
              const currentImg = allImages[dialogImageIdx];
              return (
                <>
                  <div className="relative aspect-square bg-secondary/30 overflow-hidden">
                    <img
                      src={currentImg}
                      alt={`${selectedProduct.name} view ${dialogImageIdx + 1}`}
                      className="w-full h-full object-cover transition-opacity duration-200"
                    />
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow">
                      SALE
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(null)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                      aria-label="Close"
                      data-ocid="category.close_button"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {allImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setDialogImageIdx(
                              (i) =>
                                (i - 1 + allImages.length) % allImages.length,
                            )
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setDialogImageIdx((i) => (i + 1) % allImages.length)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {allImages.map((img, i) => (
                            <button
                              key={img}
                              type="button"
                              onClick={() => setDialogImageIdx(i)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                i === dialogImageIdx
                                  ? "bg-white scale-125"
                                  : "bg-white/50"
                              }`}
                              aria-label={`View image ${i + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-6">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-xl font-bold text-foreground text-left">
                        {selectedProduct.name}
                      </DialogTitle>
                    </DialogHeader>
                    <FakeRating
                      seed={selectedProduct.id}
                      rating={selectedProduct.rating}
                      reviewCount={selectedProduct.reviewCount}
                      className="mt-2"
                    />
                    <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <span className="text-primary font-bold text-2xl">
                        ₹{selectedProduct.price}
                      </span>
                      <span className="text-muted-foreground text-base line-through">
                        ₹{selectedProduct.originalPrice}
                      </span>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        {Math.round(
                          (1 -
                            selectedProduct.price /
                              selectedProduct.originalPrice) *
                            100,
                        )}
                        % OFF
                      </span>
                    </div>
                    <Button
                      className="w-full mt-5 bg-primary text-primary-foreground hover:bg-primary/90 py-5 rounded-full shadow-bloom text-sm font-semibold"
                      onClick={() => {
                        addLocalItem(selectedProduct.id);
                        toast.success("Added to cart! 🌸");
                        setSelectedProduct(null);
                      }}
                      data-ocid="category.submit_button"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </>
              );
            })()}
        </DialogContent>
      </Dialog>
    </main>
  );
}
