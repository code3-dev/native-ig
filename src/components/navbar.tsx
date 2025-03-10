"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Instagram, Menu, X, Sun, Moon, Laptop, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "API Docs",
    href: "/api-docs",
  },
  {
    name: "Privacy",
    href: "/privacy-policy",
  },
  {
    name: "Terms",
    href: "/terms-of-service",
  },
];

const themes = [
  {
    name: "Light",
    value: "light",
    icon: Sun,
  },
  {
    name: "Dark",
    value: "dark",
    icon: Moon,
  },
  {
    name: "System",
    value: "system",
    icon: Laptop,
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const currentTheme = themes.find((t) => t.value === theme) || themes[2];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full",
        "border-b bg-background/80 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto max-w-[1900px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <Instagram className="h-6 w-6 text-primary" />
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-xl font-bold text-transparent">
                Native IG
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    "relative after:absolute after:-bottom-1 after:left-0",
                    "after:h-px after:bg-primary after:transition-all after:duration-300",
                    pathname === item.href
                      ? "text-foreground after:w-full"
                      : "text-muted-foreground/80 after:w-0 hover:text-foreground hover:after:w-full"
                  )}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <div className="relative">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-full",
                  "bg-primary/10 px-3",
                  "text-sm font-medium text-primary",
                  "transition-all duration-300",
                  "hover:bg-primary/20",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                )}
                aria-label="Select theme"
              >
                <currentTheme.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{currentTheme.name}</span>
                <ChevronDown className="h-3 w-3" />
              </motion.button>

              <AnimatePresence>
                {showThemeMenu && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50"
                      onClick={() => setShowThemeMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "absolute right-0 top-full z-50 mt-2 w-36",
                        "rounded-lg border bg-card/80 p-1 shadow-lg",
                        "backdrop-blur-sm"
                      )}
                    >
                      {themes.map((t) => (
                        <button
                          key={t.value}
                          onClick={() => {
                            setTheme(t.value);
                            setShowThemeMenu(false);
                          }}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-md px-2 py-1.5",
                            "text-sm font-medium",
                            "transition-colors",
                            theme === t.value
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground/80 hover:bg-primary/10 hover:text-foreground"
                          )}
                        >
                          <t.icon className="h-4 w-4" />
                          {t.name}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* GitHub Link */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <a
                href="https://github.com/code3-dev/native-ig"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full",
                  "bg-primary/10 px-3 py-2 sm:px-4",
                  "text-sm font-medium text-primary",
                  "transition-all duration-300",
                  "hover:bg-primary/20"
                )}
              >
                <Github className="h-5 w-5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b bg-card/30 backdrop-blur-md md:hidden"
          >
            <div className="space-y-1 px-4 pb-5 pt-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex w-full items-center rounded-lg px-3 py-2",
                      "text-base font-medium",
                      "transition-colors",
                      pathname === item.href
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground/80 hover:bg-primary/10 hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 