import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ExternalLink, Maximize2, ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { type Item } from "~/lib/items";
import { useState } from "react";

interface ItemCardProps {
  item: Item;
  index: number;
  onOpenModal: (item: Item) => void;
}

export const ItemCard = ({ item, index, onOpenModal }: ItemCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariant: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, delay: custom * 0.1, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03, rotate: 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white/90 backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/80 dark:hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]"
    >
      {/* Card glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/0 via-purple-900/0 to-purple-900/0 opacity-0 blur transition-all duration-500 group-hover:opacity-30"></div>

      {/* Floating sparkles (only appear on hover) */}
      {isHovered && (
        <>
          <motion.div
            className="absolute right-4 top-4 z-10 text-amber-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: [0, 15, 0, -15, 0],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>

          <motion.div
            className="absolute bottom-16 left-4 z-10 text-purple-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: [0, -15, 0, 15, 0],
              y: [0, -3, 0],
            }}
            transition={{
              duration: 1.5,
              delay: 0.2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <Sparkles className="h-4 w-4" />
          </motion.div>
        </>
      )}

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
      {item.description && (
        <Button
          variant="secondary"
          size="sm"
          className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          onClick={() => onOpenModal(item)}
        >
          <Maximize2 className="mr-1 h-3.5 w-3.5" />
          Quick view
        </Button>
      )}

      <div className="h-full p-6">
        <div className="mb-4 flex items-center justify-between">
          <Badge
            variant="outline"
            className="bg-gray-100 text-xs text-gray-600 dark:bg-gray-800/50 dark:text-gray-400"
          >
            {new Date(item.dateAdded).toLocaleDateString()}
          </Badge>

          <div className="flex space-x-2">
            {/* Added dynamic route link */}
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-purple-600 hover:bg-gray-100 hover:text-purple-700 dark:text-purple-400 dark:hover:bg-gray-800 dark:hover:text-purple-300"
              asChild
            >
              <Link href={`/items/${encodeURIComponent(item.title)}`}>
                View page
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-teal-600 hover:bg-gray-100 hover:text-teal-700 dark:text-teal-400 dark:hover:bg-gray-800 dark:hover:text-teal-300"
              asChild
            >
              <Link href={item.href} target="_blank" rel="noopener noreferrer">
                External
                <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        <Link
          href={`/items/${encodeURIComponent(item.title)}`}
          className="block text-xl font-bold text-gray-900 transition-colors hover:text-purple-600 dark:text-white dark:hover:text-purple-400"
        >
          {item.title}
        </Link>

        <div className="mt-3 text-gray-600 dark:text-gray-400">
          {item.caption}
        </div>
      </div>
    </motion.div>
  );
};
