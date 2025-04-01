import { motion } from "motion/react";
import { ArrowUpCircle } from "lucide-react";

interface ScrollToTopProps {
  showScrollTop: boolean;
}

export const ScrollToTop = ({ showScrollTop }: ScrollToTopProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showScrollTop) return null;

  return (
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
  );
};
