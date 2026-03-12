import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  Gift,
  Package,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const PETAL_ROTATIONS = [0, 72, 144, 216, 288];

const SKELETON_IDS = ["csk1", "csk2", "csk3"];

export function CartPage() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [sendAsGift, setSendAsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCart();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: allProducts } = useQuery({
    queryKey: ["products", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });

  const placeOrderMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const msg = sendAsGift && giftMessage ? giftMessage : null;
      return actor.placeOrder(msg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order placed! 🌸 We'll deliver in 7-14 working days.");
      setSendAsGift(false);
      setGiftMessage("");
    },
    onError: () => {
      toast.error("Failed to place order. Please try again.");
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.clearCart();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Cart cleared");
    },
  });

  const getProduct = (productId: bigint) => {
    return allProducts?.find((p) => p.id === productId);
  };

  const totalAmount =
    cartItems?.reduce((sum, item) => {
      const product = getProduct(item.productId);
      if (!product) return sum;
      return sum + Number(product.price) * Number(item.quantity);
    }, 0) ?? 0;

  const itemCount =
    cartItems?.reduce((sum, item) => sum + Number(item.quantity), 0) ?? 0;

  return (
    <main className="min-h-screen pb-16">
      {/* Delivery Notice */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary/10 via-accent/15 to-primary/10 border-b border-primary/20 px-6 py-4"
        data-ocid="cart.section"
      >
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-serif font-semibold text-foreground text-base">
              🌸 Delivery in 7 to 14 working days
            </p>
            <p className="text-xs text-muted-foreground">
              Handcrafted with care — worth the wait!
            </p>
          </div>
        </div>
      </motion.div>

      <div className="px-6 py-8 max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
          data-ocid="cart.link"
        >
          <ChevronLeft className="w-4 h-4" />
          Continue Shopping
        </Link>

        <h1 className="font-serif text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-primary" />
          Your Cart
        </h1>

        {isLoading ? (
          <div className="space-y-4" data-ocid="cart.loading_state">
            {SKELETON_IDS.map((id) => (
              <Skeleton key={id} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : !cartItems || cartItems.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            data-ocid="cart.empty_state"
          >
            <div className="relative inline-block mb-4">
              <ShoppingBag className="w-20 h-20 text-muted-foreground/30" />
              <div
                className="absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 40 40"
                  width="40"
                  height="40"
                  role="presentation"
                  aria-hidden="true"
                >
                  {PETAL_ROTATIONS.map((r) => (
                    <ellipse
                      key={r}
                      cx="20"
                      cy="8"
                      rx="6"
                      ry="10"
                      fill="#f9c8d8"
                      opacity="0.6"
                      transform={`rotate(${r} 20 20)`}
                    />
                  ))}
                </svg>
              </div>
            </div>
            <h2 className="font-serif text-2xl text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Add some beautiful pieces to get started 🌸
            </p>
            <Link to="/" data-ocid="cart.primary_button">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems.map((item, idx) => {
                const product = getProduct(item.productId);
                return (
                  <motion.div
                    key={item.productId.toString()}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className="flex items-center gap-4 bg-card rounded-2xl p-4 border border-border shadow-xs"
                    data-ocid={`cart.item.${idx + 1}`}
                  >
                    <div className="w-16 h-16 rounded-xl bg-secondary/30 overflow-hidden flex-shrink-0">
                      {product?.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-semibold text-foreground text-sm truncate">
                        {product?.name ||
                          `Product #${item.productId.toString()}`}
                      </h3>
                      <p className="text-primary font-semibold text-sm mt-0.5">
                        ₹
                        {product ? Number(product.price).toLocaleString() : "—"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Qty: {item.quantity.toString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        ₹
                        {product
                          ? (
                              Number(product.price) * Number(item.quantity)
                            ).toLocaleString()
                          : "—"}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Separator />

            {/* Send as Gift */}
            <motion.div
              className="bg-gradient-to-br from-accent/10 to-primary/5 rounded-2xl p-6 border border-accent/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <Label
                      htmlFor="gift-toggle"
                      className="font-serif font-semibold text-foreground text-base cursor-pointer"
                    >
                      Send as a Gift
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      with a customized message
                    </p>
                  </div>
                </div>
                <Switch
                  id="gift-toggle"
                  checked={sendAsGift}
                  onCheckedChange={setSendAsGift}
                  data-ocid="cart.switch"
                />
              </div>

              {sendAsGift && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label
                    htmlFor="gift-message"
                    className="text-sm font-medium text-foreground mb-2 block"
                  >
                    Your personalized gift message 💌
                  </Label>
                  <Textarea
                    id="gift-message"
                    placeholder="Write something heartfelt... e.g. 'Happy Birthday! Wishing you a bloom of joy 🌸'"
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="min-h-[100px] resize-none border-accent/30 focus:border-accent"
                    data-ocid="cart.textarea"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {giftMessage.length}/500 characters
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Order Summary */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-xs">
              <h2 className="font-serif font-semibold text-foreground text-lg mb-4">
                Order Summary
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Items ({itemCount})</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold text-foreground text-base">
                  <span>Total</span>
                  <span className="text-primary">
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>
                {sendAsGift && giftMessage && (
                  <div className="mt-3 p-3 bg-accent/10 rounded-lg">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Gift className="w-3 h-3" /> Gift message added ✓
                    </p>
                  </div>
                )}
              </div>

              <Button
                className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base rounded-full shadow-bloom"
                onClick={() => placeOrderMutation.mutate()}
                disabled={placeOrderMutation.isPending}
                data-ocid="cart.submit_button"
              >
                {placeOrderMutation.isPending ? (
                  "Placing Order..."
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Place Order{sendAsGift ? " 🎁" : " 🌸"}
                  </>
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2 text-muted-foreground hover:text-destructive text-xs"
                onClick={() => clearCartMutation.mutate()}
                disabled={clearCartMutation.isPending}
                data-ocid="cart.delete_button"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
