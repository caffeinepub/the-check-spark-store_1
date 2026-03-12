import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

const CATEGORIES = [
  {
    id: "allJewellery",
    label: "All Jewellery",
    emoji: "✨",
    desc: "Discover our full collection",
  },
  {
    id: "necklaces",
    label: "Necklaces",
    emoji: "📿",
    desc: "Elegant chains & pendants",
  },
  {
    id: "earrings",
    label: "Earrings",
    emoji: "💎",
    desc: "Studs, hoops & drops",
  },
  {
    id: "bracelets",
    label: "Bracelets",
    emoji: "🌸",
    desc: "Delicate wrist adornments",
  },
  {
    id: "anklets",
    label: "Anklets",
    emoji: "🌺",
    desc: "Charming ankle jewellery",
  },
  {
    id: "hairAccessories",
    label: "Hair Accessories",
    emoji: "🎀",
    desc: "Clips, pins & headbands",
  },
  { id: "bags", label: "Bags", emoji: "👜", desc: "Chic & functional bags" },
  {
    id: "customize",
    label: "Customize",
    emoji: "🎨",
    desc: "Create something unique",
  },
  {
    id: "giftHampers",
    label: "Gift Hampers",
    emoji: "🎁",
    desc: "Curated gifting sets",
  },
  {
    id: "otherAccessories",
    label: "Other Accessories",
    emoji: "💫",
    desc: "More beautiful finds",
  },
];

const PETAL_ROTATIONS = [0, 72, 144, 216, 288];

function BlossomDecor({
  size = 120,
  opacity = 0.2,
}: { size?: number; opacity?: number }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="presentation"
      aria-hidden="true"
    >
      {PETAL_ROTATIONS.map((r) => (
        <ellipse
          key={r}
          cx="60"
          cy="30"
          rx="18"
          ry="28"
          fill="#e8a0b8"
          transform={`rotate(${r} 60 60)`}
          opacity={opacity * 4}
        />
      ))}
      <circle cx="60" cy="60" r="8" fill="#f5e6a3" />
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FEATURED = [
  {
    img: "/assets/generated/product-necklace.dim_600x600.jpg",
    label: "Blossom Necklace",
    price: "₹1,299",
    cat: "necklaces",
  },
  {
    img: "/assets/generated/product-earrings.dim_600x600.jpg",
    label: "Pearl Drop Earrings",
    price: "₹849",
    cat: "earrings",
  },
  {
    img: "/assets/generated/product-bracelet.dim_600x600.jpg",
    label: "Charm Bracelet",
    price: "₹999",
    cat: "bracelets",
  },
];

export function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-banner.dim_1200x400.jpg"
            alt="The Check Spark Store Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/20" />
        </div>
        <div className="relative z-10 flex flex-col items-start justify-center min-h-[380px] px-8 py-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/assets/generated/cherry-blossom-logo-transparent.dim_300x300.png"
                alt=""
                className="w-10 h-10"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                Handcrafted with Love
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight mb-4">
              The Check Spark
              <br />
              <span className="text-primary italic">Store</span>
            </h1>
            <p className="text-foreground/70 text-lg max-w-md mb-6 leading-relaxed">
              Blooming with elegance — handcrafted jewellery & accessories that
              tell your story
            </p>
            <Link
              to="/category/$categoryId"
              params={{ categoryId: "allJewellery" }}
              data-ocid="hero.primary_button"
            >
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base rounded-full shadow-bloom">
                <Sparkles className="w-4 h-4 mr-2" />
                Explore Collection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div
          className="absolute right-8 top-8 opacity-20 pointer-events-none"
          aria-hidden="true"
        >
          <BlossomDecor size={120} opacity={0.2} />
        </div>
        <div
          className="absolute right-32 bottom-4 opacity-15 pointer-events-none"
          aria-hidden="true"
        >
          <BlossomDecor size={80} opacity={0.15} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative z-10 py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-2">
            Explore Our Collections
          </h2>
          <p className="text-muted-foreground">
            Each piece crafted to make you bloom 🌸
          </p>
          <div className="flex justify-center mt-3">
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {CATEGORIES.map((cat, idx) => (
            <motion.div key={cat.id} variants={itemVariants}>
              <Link
                to="/category/$categoryId"
                params={{ categoryId: cat.id }}
                data-ocid={`category.item.${idx + 1}`}
                className="group block"
              >
                <div className="relative bg-card rounded-2xl p-5 text-center shadow-xs border border-border hover:shadow-bloom hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {cat.emoji}
                  </div>
                  <h3 className="font-serif font-semibold text-sm text-foreground mb-1 leading-tight">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {cat.desc}
                  </p>
                  <div className="mt-3 flex justify-center">
                    <span className="text-xs text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Shop now <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-10 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Featured Pieces
            </h2>
            <Link
              to="/category/$categoryId"
              params={{ categoryId: "allJewellery" }}
              data-ocid="featured.link"
            >
              <Button variant="ghost" size="sm" className="text-primary">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {FEATURED.map((item, i) => (
              <Link
                key={item.cat}
                to="/category/$categoryId"
                params={{ categoryId: item.cat }}
                data-ocid={`featured.item.${i + 1}`}
              >
                <motion.div
                  className="group bg-card rounded-2xl overflow-hidden shadow-xs border border-border hover:shadow-bloom transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-semibold text-foreground">
                      {item.label}
                    </h3>
                    <p className="text-primary font-semibold mt-1">
                      {item.price}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border text-center text-sm text-muted-foreground">
        <div className="flex justify-center mb-3">
          <img
            src="/assets/generated/cherry-blossom-logo-transparent.dim_300x300.png"
            alt=""
            className="w-8 h-8 opacity-60"
          />
        </div>
        <p className="font-serif italic text-foreground/60">
          "Every piece tells a story of bloom"
        </p>
        <p className="mt-3">
          © {new Date().getFullYear()}. Built with{" "}
          <span className="text-accent-foreground">♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </main>
  );
}
