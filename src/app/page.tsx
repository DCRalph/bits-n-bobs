"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { api } from "~/trpc/react";

// Import our components
import { Header } from "~/components/Header";
import { SearchBar } from "~/components/SearchBar";
import { FiltersSection } from "~/components/FiltersSection";
import { ItemCard } from "~/components/ItemCard";
import { NoResults } from "~/components/NoResults";
import { ItemModal } from "~/components/ItemModal";
import { BackgroundElements } from "~/components/BackgroundElements";
import { ThemeToggle } from "~/components/ThemeToggle";
import { ScrollToTop } from "~/components/ScrollToTop";

import type { Item } from "~/lib/items";

export default function HomePage() {
  const utils = api.useUtils();
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

  const openItemModal = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const refreshData = async () => {
    await utils.items.getItems.reset();
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gradient-to-br dark:from-gray-950 dark:via-slate-900 dark:to-gray-900 dark:text-gray-100">
      {/* Background elements */}
      <BackgroundElements />

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && <ScrollToTop showScrollTop={showScrollTop} />}
      </AnimatePresence>

      {/* Header section */}
      <Header />

      <main className="container relative mx-auto px-4 pb-16" ref={mainRef}>
        {/* Search bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Filters and sorting */}
        <FiltersSection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          refreshData={refreshData}
        />

        <section>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : (
            <>
              {items && items.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((item, index) => (
                    <ItemCard
                      key={item.title}
                      item={item}
                      index={index}
                      onOpenModal={openItemModal}
                    />
                  ))}
                </div>
              ) : (
                <NoResults
                  searchQuery={debouncedSearchQuery}
                  selectedCategory={selectedCategory}
                />
              )}
            </>
          )}
        </section>
      </main>

      {/* Item detail modal */}
      <ItemModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedItem={selectedItem}
      />
    </div>
  );
}
