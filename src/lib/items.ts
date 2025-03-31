// /lib/items.ts

export type Category =
  | "All"
  | "Projects"
  | "Tools"
  | "Articles"
  | "Resources"
  | "Other";
export const CATEGORIES: Category[] = [
  "All",
  "Projects",
  "Tools",
  "Articles",
  "Resources",
  "Other",
];

export interface Item {
  title: string;
  category: Category;
  description: string;
  image?: string;
  href: string;
  dateAdded: Date;
}

export const items: Item[] = [
  {
    title: "Link2it",
    category: "Projects",
    description:
      "Link2it is a link shortener that allows you to shorten links and track the number of clicks. It also includes a link shearing feature similar to link tree and the likes. It also has a bookmarks feature that allows you to save links for later.",
    // image: "/images/car-auction.png",
    href: "https://link2it.cc",
    dateAdded: new Date("2025-3-17"),
  },
  {
    title: "Police codes",
    category: "Resources",
    description: "A list of all the codes used by police over the radio.",
    // image: "/images/car-auction.png",
    href: "/projects/police-codes",
    dateAdded: new Date("2025-3-14"),
  },
  {
    title: "Car Scraper",
    category: "Projects",
    description:
      "Scraps car data from a car turners. I plan to add more websites in the future.",
    href: "https://cars.w-g.co",
    dateAdded: new Date("2025-2-25"),
  },
];
