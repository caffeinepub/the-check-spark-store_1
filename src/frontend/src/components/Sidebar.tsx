import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Info,
  LogOut,
  Menu,
  Settings,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const CATEGORIES = [
  { id: "allJewellery", label: "All Jewellery", emoji: "✨" },
  { id: "necklaces", label: "Necklaces", emoji: "📿" },
  { id: "earrings", label: "Earrings", emoji: "💎" },
  { id: "bracelets", label: "Bracelets", emoji: "🌸" },
  { id: "anklets", label: "Anklets", emoji: "🌺" },
  { id: "hairAccessories", label: "Hair Accessories", emoji: "🎀" },
  { id: "bags", label: "Bags", emoji: "👜" },
  { id: "customize", label: "Customize", emoji: "🎨" },
  { id: "giftHampers", label: "Gift Hampers", emoji: "🎁" },
  { id: "otherAccessories", label: "Other Accessories", emoji: "💫" },
];

interface SidebarProps {
  cartCount: number;
}

export function Sidebar({ cartCount }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { login, clear, loginStatus, identity } = useInternetIdentity();

  const isLoggedIn = loginStatus === "success" && identity;
  const principal = identity?.getPrincipal().toString();
  const shortPrincipal = principal ? `${principal.slice(0, 8)}...` : "";

  const navContent = (
    <nav className="flex flex-col h-full">
      {/* Logo & Store Name */}
      <Link
        to="/"
        className="flex flex-col items-center py-6 px-4 group"
        data-ocid="nav.link"
        onClick={() => setMobileOpen(false)}
      >
        <div className="w-20 h-20 mb-2 drop-shadow-md group-hover:scale-105 transition-transform duration-300">
          <img
            src="/assets/generated/cherry-blossom-logo-transparent.dim_300x300.png"
            alt="The Chic Spark Store Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="font-serif text-center text-primary font-semibold leading-tight text-sm">
          The Chic Spark Store
        </h1>
        <div className="w-12 h-0.5 mt-3 bg-accent rounded-full" />
      </Link>

      {/* Category Links */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-2">
          Shop
        </p>
        {CATEGORIES.map((cat) => {
          const isActive = location.pathname === `/category/${cat.id}`;
          return (
            <Link
              key={cat.id}
              to="/category/$categoryId"
              params={{ categoryId: cat.id }}
              data-ocid="nav.link"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 mb-0.5 ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground"
              }`}
            >
              <span className="text-base">{cat.emoji}</span>
              <span>{cat.label}</span>
            </Link>
          );
        })}

        <Separator className="my-3" />

        <Link
          to="/about"
          data-ocid="nav.link"
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 mb-0.5 ${
            location.pathname === "/about"
              ? "bg-primary/10 text-primary font-medium"
              : "text-foreground/70 hover:bg-secondary hover:text-foreground"
          }`}
        >
          <Info className="w-4 h-4" />
          <span>About Us</span>
        </Link>

        <Link
          to="/admin"
          data-ocid="nav.link"
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 mb-0.5 ${
            location.pathname === "/admin"
              ? "bg-primary/10 text-primary font-medium"
              : "text-foreground/70 hover:bg-secondary hover:text-foreground"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Admin Panel</span>
        </Link>

        <Link
          to="/cart"
          data-ocid="nav.link"
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 mb-0.5 ${
            location.pathname === "/cart"
              ? "bg-primary/10 text-primary font-medium"
              : "text-foreground/70 hover:bg-secondary hover:text-foreground"
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-none">
                {cartCount}
              </Badge>
            )}
          </div>
          <span>Cart</span>
          {cartCount > 0 && (
            <Badge variant="secondary" className="ml-auto text-xs">
              {cartCount}
            </Badge>
          )}
        </Link>

        <Separator className="my-3" />

        {isLoggedIn ? (
          <div className="px-3 py-2">
            <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="truncate">{shortPrincipal}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => clear()}
              data-ocid="nav.button"
            >
              <LogOut className="w-3 h-3 mr-1" />
              Log Out
            </Button>
          </div>
        ) : (
          <Button
            className="mx-3 w-[calc(100%-1.5rem)] bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
            size="sm"
            onClick={() => login()}
            disabled={loginStatus === "logging-in"}
            data-ocid="nav.button"
          >
            <User className="w-4 h-4 mr-2" />
            {loginStatus === "logging-in" ? "Logging in..." : "Log In"}
          </Button>
        )}
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-sidebar border-b border-sidebar-border shadow-petal">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/generated/cherry-blossom-logo-transparent.dim_300x300.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="font-serif text-sm font-semibold text-primary">
            The Chic Spark Store
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/cart" className="relative" data-ocid="nav.link">
            <ShoppingBag className="w-5 h-5 text-foreground/70" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-none">
                {cartCount}
              </Badge>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close menu"
          className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm cursor-default"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-72 bg-sidebar shadow-bloom transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed top-0 left-0 h-full bg-sidebar border-r border-sidebar-border shadow-petal z-30">
        {navContent}
      </aside>
    </>
  );
}
