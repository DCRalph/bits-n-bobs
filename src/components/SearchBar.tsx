import { Search, X } from "lucide-react";
import { motion } from "motion/react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { type ChangeEvent } from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  const variant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.4 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variant}
      className="relative mx-auto mb-8 max-w-lg"
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
  );
};
