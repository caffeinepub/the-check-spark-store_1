import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Package, PlusCircle, Shield, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Category } from "../backend.d";
import { useActor } from "../hooks/useActor";

const CATEGORIES = [
  { value: Category.allJewellery, label: "All Jewellery" },
  { value: Category.necklaces, label: "Necklaces" },
  { value: Category.earrings, label: "Earrings" },
  { value: Category.bracelets, label: "Bracelets" },
  { value: Category.anklets, label: "Anklets" },
  { value: Category.hairAccessories, label: "Hair Accessories" },
  { value: Category.bags, label: "Bags" },
  { value: Category.customize, label: "Customize" },
  { value: Category.giftHampers, label: "Gift Hampers" },
  { value: Category.otherAccessories, label: "Other Accessories" },
];

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

const defaultForm = {
  name: "",
  description: "",
  price: "",
  category: Category.allJewellery,
  imageUrl: "",
  inStock: true,
};

export function AdminPage() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [form, setForm] = useState(defaultForm);

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const priceNum = Number.parseFloat(form.price);
      if (Number.isNaN(priceNum) || priceNum <= 0)
        throw new Error("Invalid price");
      return actor.addProduct({
        id: 0n,
        name: form.name.trim(),
        description: form.description.trim(),
        price: BigInt(Math.round(priceNum * 100)),
        category: form.category,
        imageUrl: form.imageUrl.trim(),
        inStock: form.inStock,
      });
    },
    onSuccess: () => {
      toast.success("Product added successfully! 🌸");
      setForm(defaultForm);
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to add product");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!form.price || Number.isNaN(Number.parseFloat(form.price))) {
      toast.error("Valid price is required");
      return;
    }
    addMutation.mutate();
  };

  return (
    <TooltipProvider>
      <main className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-semibold text-foreground">
              Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your store products
            </p>
          </div>
        </div>

        {/* Add Product Form */}
        <Card className="mb-8 border-border shadow-petal">
          <CardHeader className="pb-4">
            <CardTitle className="font-serif text-lg flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-primary" />
              Add New Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Product Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="product-name" className="text-sm font-medium">
                    Product Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="product-name"
                    data-ocid="admin.product_name.input"
                    placeholder="e.g. Rose Gold Necklace"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="border-input"
                  />
                </div>

                {/* Price */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="product-price"
                    className="text-sm font-medium"
                  >
                    Price (₹ INR) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="product-price"
                    data-ocid="admin.product_price.input"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g. 499"
                    value={form.price}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, price: e.target.value }))
                    }
                    className="border-input"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Category</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, category: v as Category }))
                    }
                  >
                    <SelectTrigger
                      data-ocid="admin.product_category.select"
                      className="border-input"
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Image URL */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="product-image"
                    className="text-sm font-medium"
                  >
                    Image URL{" "}
                    <span className="text-muted-foreground text-xs">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="product-image"
                    data-ocid="admin.product_image_url.input"
                    placeholder="https://..."
                    value={form.imageUrl}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, imageUrl: e.target.value }))
                    }
                    className="border-input"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="product-desc" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="product-desc"
                  data-ocid="admin.product_description.textarea"
                  placeholder="Describe your product..."
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  className="border-input resize-none"
                />
              </div>

              {/* In Stock toggle */}
              <div className="flex items-center gap-3">
                <Switch
                  id="in-stock"
                  data-ocid="admin.product_instock.switch"
                  checked={form.inStock}
                  onCheckedChange={(v) =>
                    setForm((p) => ({ ...p, inStock: v }))
                  }
                />
                <Label
                  htmlFor="in-stock"
                  className="text-sm font-medium cursor-pointer"
                >
                  {form.inStock ? "In Stock" : "Out of Stock"}
                </Label>
              </div>

              <Separator />

              <Button
                type="submit"
                data-ocid="admin.add_product.submit_button"
                disabled={addMutation.isPending}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6"
              >
                {addMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Product
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="border-border shadow-petal">
          <CardHeader className="pb-4">
            <CardTitle className="font-serif text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              All Products
              {products && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {products.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {productsLoading ? (
              <div
                data-ocid="admin.products.loading_state"
                className="p-6 space-y-3"
              >
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-md" />
                ))}
              </div>
            ) : !products || products.length === 0 ? (
              <div
                data-ocid="admin.products.empty_state"
                className="flex flex-col items-center justify-center py-16 text-center px-6"
              >
                <div className="text-4xl mb-3">🌸</div>
                <p className="font-serif text-base text-foreground font-medium">
                  No products yet
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add your first product using the form above.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table data-ocid="admin.products.table">
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="font-semibold text-foreground">
                        #
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Name
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Category
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Price
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Stock
                      </TableHead>
                      <TableHead className="font-semibold text-foreground text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product, idx) => (
                      <TableRow
                        key={String(product.id)}
                        className="border-border hover:bg-secondary/50"
                      >
                        <TableCell className="text-muted-foreground text-sm">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">
                          {product.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {CATEGORY_LABELS[product.category] ??
                            product.category}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">
                          ₹{(Number(product.price) / 100).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {product.inStock ? (
                            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                              In Stock
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              Out of Stock
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  disabled
                                  data-ocid={`admin.product.delete_button.${idx + 1}`}
                                  className="text-muted-foreground cursor-not-allowed opacity-50 h-8 w-8"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                              <p>Coming soon</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-muted-foreground pb-6">
          © {new Date().getFullYear()}. Built with ♥ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            caffeine.ai
          </a>
        </footer>
      </main>
    </TooltipProvider>
  );
}
