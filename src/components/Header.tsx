import { motion } from "motion/react";
import { ExternalLink, Sparkles, Zap, Leaf } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { FloatingElement } from "./AnimatedElements";

export const Header = () => {
  return (
    <header className="container relative mx-auto p-8 text-center">
      <motion.h1
        className="relative text-6xl font-black md:text-8xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span className="bg-gradient-to-r from-teal-400 via-purple-500 to-amber-500 bg-clip-text text-transparent">
          bits n bobs
        </motion.span>
        {/* <FloatingElement delay={1}> */}
          <motion.div
            className="absolute -right-8 top-0 h-8 w-8 text-amber-400 md:-right-12 md:h-12 md:w-12"
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Sparkles className="h-full w-full" />
          </motion.div>
        {/* </FloatingElement> */}

        <FloatingElement delay={0.5}>
          <motion.div
            className="absolute -left-8 bottom-0 h-6 w-6 text-purple-400 md:-left-12 md:h-10 md:w-10"
            animate={{ rotate: -360 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Zap className="h-full w-full" />
          </motion.div>
        </FloatingElement>
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
          className="group flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-white hover:shadow-md dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-700"
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
        className="relative"
      >
        <FloatingElement delay={1.5}>
          <motion.div
            className="absolute -right-10 -top-6 text-green-400"
            animate={{ rotate: 45 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            <Leaf className="h-5 w-5" />
          </motion.div>
        </FloatingElement>

        <Badge
          variant="outline"
          className="mt-4 bg-white/50 text-amber-600 backdrop-blur-sm dark:bg-gray-800/30 dark:text-amber-400"
        >
          Designed by monkeys with a drinking problem. 🐒🍺
        </Badge>
      </motion.div>
    </header>
  );
};
