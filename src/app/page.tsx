"use client";

import Image from "next/image";
import { useState, useEffect, type ChangeEvent, useRef } from "react";
import { useTheme } from "next-themes";
import { api } from "~/trpc/react";
import {
  Sparkles,
  Search,
  Loader2,
  ExternalLink,
  Sun,
  Moon,
  ArrowUpCircle,
  Filter,
  SortAsc,
  SortDesc,
  X,
  ChevronDown,
  Maximize2,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { motion } from "framer-motion";
import { CATEGORIES, type Item } from "~/lib/items";

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);

  // Debounce search query to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Use the consolidated getItems endpoint
  const itemsQuery = api.items.getItems.useQuery({
    query: debouncedSearchQuery,
    category: selectedCategory,
    sortOrder: sortOrder,
  });

  const { data: items, isLoading } = itemsQuery;

  // Refetch data when sort order or category changes
  // useEffect(() => {
  //   void itemsQuery.refetch();
  // }, [sortOrder, selectedCategory, itemsQuery]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openItemModal = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gradient-to-br dark:from-gray-950 dark:via-slate-900 dark:to-gray-900 dark:text-gray-100">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl transition-colors duration-500 dark:bg-purple-900/20"></div>
        <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl transition-colors duration-500 dark:bg-teal-900/20"></div>
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl transition-colors duration-500 dark:bg-amber-900/20"></div>
      </div>

      {/* Theme toggle button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed right-4 top-4 z-50 rounded-full bg-white p-2 text-gray-800 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-700"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label={
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </motion.button>

      {/* Scroll to top button */}

      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50 rounded-full bg-white p-2 text-purple-600 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-gray-700"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUpCircle className="h-6 w-6" />
        </motion.button>
      )}

      <header className="container relative mx-auto p-8 text-center">
        <motion.h1
          className="relative text-6xl font-black md:text-8xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-teal-400 via-purple-500 to-amber-500 bg-clip-text text-transparent">
            bits n bobs
          </span>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute -right-8 top-0 h-8 w-8 text-amber-400 md:-right-12 md:h-12 md:w-12"
          >
            <Sparkles className="h-full w-full" />
          </motion.div>
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-xl text-gray-600 dark:text-gray-300 md:text-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          A bunch of my random projects and some useful information.
        </motion.p>

        <motion.div
          className="mt-6 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="https://williamgiles.co.nz"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-white hover:shadow-md dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-700/70 dark:hover:text-white"
          >
            Made by William
            <ExternalLink className="h-3.5 w-3.5 opacity-70 transition-all group-hover:opacity-100" />
          </a>

          <a
            href="https://dcralph.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-white hover:shadow-md dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-700/70 dark:hover:text-white"
          >
            DCRalph Enterprises
            <ExternalLink className="h-3.5 w-3.5 opacity-70 transition-all group-hover:opacity-100" />
          </a>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Badge
            variant="outline"
            className="mt-4 bg-white/50 text-amber-600 backdrop-blur-sm dark:bg-gray-800/30 dark:text-amber-400"
          >
            Designed by monkeys with a drinking problem. 🐒🍺
          </Badge>
        </motion.div>
      </header>

      <main className="container relative mx-auto px-4 pb-16" ref={mainRef}>
        <motion.div
          className="relative mx-auto mb-8 max-w-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="absolute inset-0 -m-2 rounded-xl bg-gradient-to-r from-teal-500 via-purple-500 to-amber-500 opacity-70 blur-md"></div>
          <div className="relative flex items-center rounded-lg bg-white/90 backdrop-blur-sm dark:bg-gray-800/90">
            <Search className="ml-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="border-0 bg-transparent px-4 py-3 text-gray-900 placeholder-gray-500 !ring-0 dark:text-white dark:placeholder-gray-400"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery("")}
                className="mr-2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>

        {/* Filters and sorting */}
        <motion.div
          className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-white/80 p-4 backdrop-blur-sm dark:bg-gray-800/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-700 dark:text-gray-300">Filter:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <Filter className="h-3.5 w-3.5" />
                  {selectedCategory}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {CATEGORIES.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-purple-500/10 font-medium"
                        : ""
                    }
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex items-center gap-1 border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {sortOrder === "asc" ? (
              <>
                <SortAsc className="h-3.5 w-3.5" />
                Oldest first
              </>
            ) : (
              <>
                <SortDesc className="h-3.5 w-3.5" />
                Newest first
              </>
            )}
          </Button>
        </motion.div>

        <section>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : (
            <>
              {items && items.length > 0 ? (
                <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((item, index) => (
                    <motion.li
                      key={item.title}
                      // initial={{ opacity: 0, y: 20 }}
                      // animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                        ease: "easeOut",
                      }}
                      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/80 dark:hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]"
                    >
                      {/* Card glow effect */}
                      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/0 via-purple-900/0 to-purple-900/0 opacity-0 blur transition-all duration-500 group-hover:opacity-30"></div>

                      {item.image && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-60 dark:from-gray-900"></div>
                        </div>
                      )}

                      {/* Quick view button */}
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        onClick={() => openItemModal(item)}
                      >
                        <Maximize2 className="mr-1 h-3.5 w-3.5" />
                        Quick view
                      </Button>

                      <div className="h-full p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className="bg-gray-100 text-xs text-gray-600 dark:bg-gray-800/50 dark:text-gray-400"
                          >
                            {new Date(item.dateAdded).toLocaleDateString()}
                          </Badge>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-teal-600 hover:bg-gray-100 hover:text-teal-700 dark:text-teal-400 dark:hover:bg-gray-800 dark:hover:text-teal-300"
                            asChild
                          >
                            <a href={item.href}>
                              View details
                              <ExternalLink className="ml-1 h-3.5 w-3.5" />
                            </a>
                          </Button>
                        </div>

                        <a
                          href={item.href}
                          className="block text-xl font-bold text-gray-900 transition-colors hover:text-purple-600 dark:text-white dark:hover:text-purple-400"
                        >
                          {item.title}
                        </a>

                        <p className="mt-3 text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center py-16 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800/50">
                    <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">
                    No items found
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {debouncedSearchQuery ? (
                      <>
                        No results for{" "}
                        <span className="font-medium">
                          &quot;{debouncedSearchQuery}&quot;
                        </span>
                      </>
                    ) : selectedCategory !== "All" ? (
                      <>
                        No items in{" "}
                        <span className="font-medium">{selectedCategory}</span>{" "}
                        category
                      </>
                    ) : (
                      "No items available"
                    )}
                  </p>
                </motion.div>
              )}
            </>
          )}
        </section>
      </main>

      {/* Item detail modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedItem.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  Added on{" "}
                  {new Date(selectedItem.dateAdded).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>

              {selectedItem.image && (
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <Image
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="text-gray-700 dark:text-gray-300">
                <p>{selectedItem.description}</p>

                <div className="mt-6 flex justify-end">
                  <Button asChild>
                    <a
                      href={selectedItem.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
