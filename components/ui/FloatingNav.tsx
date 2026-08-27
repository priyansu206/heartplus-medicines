"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, User, MessageSquare, Calendar, Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

const DEFAULT_ITEMS: NavItem[] = [
  { name: "Home", link: "#home", icon: <Home className="h-4 w-4" /> },
  { name: "Services", link: "#services", icon: <User className="h-4 w-4" /> },
  { name: "Reviews", link: "#reviews", icon: <MessageSquare className="h-4 w-4" /> },
  { name: "Reach Us", link: "#reach-us", icon: <Calendar className="h-4 w-4" /> },
];

interface FloatingNavProps {
  navItems?: NavItem[];
  onBookClick?: () => void;
  /** How many pixels to scroll before the nav appears */
  showAfter?: number;
}

/**
 * A floating glass-morphism navbar that appears after scrolling past the hero.
 * Morphs in from the top with a spring animation and out when scrolling back up.
 */
export function FloatingNav({
  navItems = DEFAULT_ITEMS,
  onBookClick,
  showAfter = 400,
}: FloatingNavProps) {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > showAfter);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [mobileOpen]);

  const scrollTo = (link: string) => {
    setMobileOpen(false);
    const id = link.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -100, opacity: 0, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              mass: 0.8,
            }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[90] hidden md:flex items-center gap-1 px-2 py-2 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          >
            {/* Logo */}
            <span className="text-sm font-bold text-white px-3 select-none">
              HP
            </span>

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-1" />

            {/* Nav items */}
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.link)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-200 group"
              >
                <span className="text-white/40 group-hover:text-white/70 transition-colors">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </button>
            ))}

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-1" />

            {/* Book button */}
            {onBookClick && (
              <button
                onClick={onBookClick}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:scale-105 transition-transform"
              >
                Book
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile floating button */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-6 right-6 z-[90] md:hidden"
          >
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-14 h-14 rounded-full bg-white/[0.1] backdrop-blur-xl border border-white/[0.15] flex items-center justify-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)] active:scale-90 transition-transform"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <Menu
                className={`absolute transition-all duration-300 ${
                  mobileOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                }`}
                size={20}
              />
              <X
                className={`absolute transition-all duration-300 ${
                  mobileOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                }`}
                size={20}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile expanded menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[85] bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed bottom-24 right-6 z-[86] w-56 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] shadow-[0_16px_48px_rgba(0,0,0,0.5)] p-3 md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollTo(item.link)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                  >
                    <span className="text-white/40">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
                {onBookClick && (
                  <>
                    <div className="h-px bg-white/10 my-1" />
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        onBookClick();
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:scale-[1.02] transition-transform"
                    >
                      Book Appointment
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
