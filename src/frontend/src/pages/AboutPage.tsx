import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

const PETAL_ROTATIONS = [0, 72, 144, 216, 288];

function BlossomDecor({ size = 160 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 160 160"
      width={size}
      height={size}
      role="presentation"
      aria-hidden="true"
    >
      {PETAL_ROTATIONS.map((r) => (
        <ellipse
          key={r}
          cx="80"
          cy="35"
          rx="22"
          ry="36"
          fill="#e8a0b8"
          transform={`rotate(${r} 80 80)`}
          opacity="0.8"
        />
      ))}
      <circle cx="80" cy="80" r="10" fill="#f5e6a3" />
    </svg>
  );
}

const OFFERINGS = [
  {
    emoji: "📿",
    title: "Necklaces & Pendants",
    desc: "Elegant chains, layered sets, and statement pendants",
  },
  {
    emoji: "💎",
    title: "Earrings",
    desc: "From delicate studs to dramatic drops",
  },
  {
    emoji: "🌸",
    title: "Bracelets & Anklets",
    desc: "Charming wrist and ankle adornments",
  },
  {
    emoji: "🎀",
    title: "Hair Accessories",
    desc: "Pins, clips, headbands and more",
  },
  { emoji: "👜", title: "Bags", desc: "Chic, functional everyday companions" },
  {
    emoji: "🎁",
    title: "Gift Hampers",
    desc: "Curated sets perfect for gifting",
  },
  { emoji: "🎨", title: "Customize", desc: "Create something uniquely yours" },
  {
    emoji: "💫",
    title: "Other Accessories",
    desc: "Sunglasses, keychains & more",
  },
];

const VALUES = [
  {
    title: "Handcrafted",
    desc: "Every piece made with care and intention",
    emoji: "🤲",
  },
  {
    title: "Quality First",
    desc: "Only the finest materials, always",
    emoji: "⭐",
  },
  {
    title: "Made with Love",
    desc: "Because you deserve nothing less",
    emoji: "💕",
  },
];

const TIMELINE = [
  {
    year: "2024",
    title: "Where It All Began",
    desc: "The Chic Spark Store was born from a heartfelt passion for jewellery and handcrafted beauty. Starting as a small, intimate venture, we began curating and creating pieces that told stories — each necklace, bracelet, and accessory carefully chosen to make every woman feel truly extraordinary. Word spread through love, trust, and the joy of every happy customer.",
    emoji: "🌱",
  },
  {
    year: "2025",
    title: "Growing in Full Bloom",
    desc: "With a growing community of loyal customers and a deepened love for our craft, we expanded our collection to include more categories — from hair accessories and bags to fully customized gift hampers. Every order was packed with care, every piece shipped with warmth. The spark had become a flame.",
    emoji: "🌸",
  },
  {
    year: "2026",
    title: "Our Official Website Launch",
    desc: "In 2026, The Chic Spark Store proudly launched its official website — a dedicated home for our blossoming collection. Now anyone, anywhere, can discover our jewellery, shop their favourite pieces, and send gifts to the people they love. This is only the beginning of our most exciting chapter yet.",
    emoji: "✨",
  },
];

export function AboutPage() {
  return (
    <main className="min-h-screen pb-16">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-secondary/40 via-background to-accent/10 border-b border-border px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/assets/generated/cherry-blossom-logo-transparent.dim_300x300.png"
              alt="Logo"
              className="w-14 h-14"
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">
              Our Story
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            About The Chic Spark Store
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Where jewellery blooms like cherry blossoms — fleeting, beautiful,
            and deeply meaningful. Est. 2024.
          </p>
        </motion.div>
        <div
          className="absolute right-8 top-8 opacity-20 pointer-events-none"
          aria-hidden="true"
        >
          <BlossomDecor size={160} />
        </div>
      </div>

      <div className="px-8 py-12 max-w-3xl mx-auto space-y-12">
        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Our Mission
            </h2>
          </div>
          <p className="text-foreground/70 leading-relaxed text-base">
            The Chic Spark Store was born from a deep love of handcrafted
            beauty. Founded by passionate artisans who believe that every woman
            deserves to wear something that makes her feel extraordinary, we
            create jewellery and accessories that carry meaning, emotion, and
            elegance.
          </p>
          <p className="text-foreground/70 leading-relaxed text-base mt-3">
            Every piece in our collection is thoughtfully designed and carefully
            crafted — from the delicate necklaces that rest close to your heart,
            to the intricate hair accessories that crown your beauty.
          </p>
        </motion.section>

        {/* Our Journey Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Our Journey
            </h2>
          </div>
          <div className="relative pl-6 border-l-2 border-primary/20 space-y-10">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Dot */}
                <span className="absolute -left-[1.65rem] top-1 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-primary block" />
                </span>
                <div className="bg-gradient-to-br from-secondary/20 to-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{item.emoji}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Cherry Blossom */}
        <motion.section
          className="bg-gradient-to-br from-accent/10 to-secondary/30 rounded-3xl p-8 border border-accent/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🌸</span>
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              The Cherry Blossom Spirit
            </h2>
          </div>
          <p className="text-foreground/70 leading-relaxed">
            The cherry blossom is our symbol — a reminder that beauty is
            precious, transient, and worth celebrating. Just like sakura blooms
            that paint the world pink for a brief, magical season, our jewellery
            is designed to make your every moment extraordinary. Wear it with
            joy. Gift it with love.
          </p>
        </motion.section>

        {/* Offerings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              What We Offer
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OFFERINGS.map((item) => (
              <motion.div
                key={item.title}
                className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-petal transition-shadow"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <h3 className="font-serif font-semibold text-foreground text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Star className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Our Promise
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-gradient-to-b from-secondary/30 to-card rounded-2xl p-6 border border-border"
              >
                <div className="text-3xl mb-3">{v.emoji}</div>
                <h3 className="font-serif font-semibold text-foreground mb-1">
                  {v.title}
                </h3>
                <p className="text-xs text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">
            Ready to bloom? 🌸
          </h2>
          <p className="text-muted-foreground mb-6">
            Explore our collection and find your perfect piece.
          </p>
          <Link
            to="/category/$categoryId"
            params={{ categoryId: "allJewellery" }}
            data-ocid="about.primary_button"
          >
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base rounded-full shadow-bloom">
              <Sparkles className="w-5 h-5 mr-2" />
              Shop Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <footer className="py-8 px-6 border-t border-border text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} The Chic Spark Store. Est. 2024. Built
          with <span className="text-accent-foreground">♥</span> using{" "}
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
