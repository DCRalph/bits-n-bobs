import { Search } from "lucide-react";
import { motion } from "motion/react";

interface NoResultsProps {
  searchQuery: string;
  selectedCategory: string;
}

export const NoResults = ({
  searchQuery,
  selectedCategory,
}: NoResultsProps) => {
  return (
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
        {searchQuery ? (
          <>
            No results for{" "}
            <span className="font-medium">&quot;{searchQuery}&quot;</span>
          </>
        ) : selectedCategory !== "All" ? (
          <>
            No items in <span className="font-medium">{selectedCategory}</span>{" "}
            category
          </>
        ) : (
          "No items available"
        )}
      </p>
    </motion.div>
  );
};
