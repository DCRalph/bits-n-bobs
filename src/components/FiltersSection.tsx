import { motion, AnimatePresence } from "motion/react";
import {
  Filter,
  SortAsc,
  SortDesc,
  X,
  ChevronDown,
  RefreshCcw,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { CATEGORIES } from "~/lib/items";

interface FiltersSectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  refreshData: () => Promise<void>;
}

export const FiltersSection = ({
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
  searchQuery,
  setSearchQuery,
  refreshData,
}: FiltersSectionProps) => {
  const variant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.5 },
    },
  };

  return (
    <motion.div
      className="mb-8 rounded-xl bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-colors dark:bg-gray-800/70 dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
      variants={variant}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-gray-100/80 px-3 py-1.5 text-sm font-medium text-gray-700 dark:bg-gray-700/50 dark:text-gray-300">
            <Filter className="h-4 w-4 text-purple-500 dark:text-purple-400" />
            <span>Filter by:</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="group border-gray-200 bg-white/80 font-medium text-gray-800 shadow-sm transition-all hover:bg-purple-50 hover:text-purple-600 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-700/90 dark:hover:text-purple-400"
              >
                <span className="mr-1.5">{selectedCategory}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-all group-hover:opacity-100" />
              </Button>
            </DropdownMenuTrigger>
            <AnimatePresence>
              <DropdownMenuContent
                className="min-w-[140px] overflow-hidden rounded-lg border-gray-200 p-1 shadow-lg dark:border-gray-700"
                asChild
              >
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex flex-col gap-1"
                >
                  {CATEGORIES.map((category, index) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      asChild
                    >
                      <motion.div
                        initial={{ x: -15, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className={`cursor-pointer rounded-md px-3 py-2 text-sm transition-colors ${
                          selectedCategory === category
                            ? "bg-purple-100 font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                            : "hover:bg-gray-100 dark:hover:bg-gray-900"
                        }`}
                      >
                        <motion.span
                          className={`${
                            selectedCategory === category
                              ? "text-purple-700"
                              : "dark:text-gray-300"
                          }`}
                        >
                          {category}
                        </motion.span>
                      </motion.div>
                    </DropdownMenuItem>
                  ))}
                </motion.div>
              </DropdownMenuContent>
            </AnimatePresence>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            className="group border-gray-200 bg-white/80 text-gray-700 shadow-sm transition-all hover:bg-teal-50 hover:text-teal-600 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700/90 dark:hover:text-teal-400"
          >
            <RefreshCcw className="h-3.5 w-3.5 transition-all group-hover:rotate-180" />
            <span className="ml-1.5 hidden sm:inline">Refresh</span>
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="group border-gray-200 bg-white/80 font-medium text-gray-700 shadow-sm transition-all hover:bg-amber-50 hover:text-amber-600 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700/90 dark:hover:text-amber-400"
        >
          {sortOrder === "asc" ? (
            <>
              <SortAsc className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
              <span className="ml-1.5">Oldest first</span>
            </>
          ) : (
            <>
              <SortDesc className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
              <span className="ml-1.5">Newest first</span>
            </>
          )}
        </Button>
      </div>

      {(selectedCategory !== "All" || searchQuery) && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-200 pt-4 dark:border-gray-700/50">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Active filters:
          </span>
          {selectedCategory !== "All" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
              >
                Category: {selectedCategory}
                <motion.div
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-1 h-4 w-4 p-0 hover:bg-purple-200 dark:hover:bg-purple-800/50"
                    onClick={() => setSelectedCategory("All")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </motion.div>
              </Badge>
            </motion.div>
          )}
          {searchQuery && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 bg-teal-100 px-2 py-1 text-xs font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
            >
              Search: {searchQuery}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0 hover:bg-teal-200 dark:hover:bg-teal-800/50"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </motion.div>
  );
};
