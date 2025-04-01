import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileTap={{ rotate: 20 }}
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
  );
};
