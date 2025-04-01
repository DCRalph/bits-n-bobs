// import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "~/components/ui/button";
import ReactMarkdown from "react-markdown";
import { ReusableDialog } from "~/components/MyDialog";
import { type Item } from "~/lib/items";

interface ItemModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItem: Item | null;
}

export const ItemModal = ({
  isOpen,
  onOpenChange,
  selectedItem,
}: ItemModalProps) => {
  if (!selectedItem) return null;

  return (
    <ReusableDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={selectedItem.title}
    >
      <motion.div>
        <div className="text-gray-600 dark:text-gray-400">
          Added on {new Date(selectedItem.dateAdded).toLocaleDateString()}
        </div>

        <div className="text-gray-700 dark:text-gray-300">
          <div className="prose dark:prose-invert mt-3 text-gray-600 dark:text-gray-400">
            <ReactMarkdown>{selectedItem.description}</ReactMarkdown>
          </div>
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
      </motion.div>
    </ReusableDialog>
  );
};
