// /lib/items.ts
export interface Item {
  title: string;
  description: string;
  image?: string;
  href: string;
  dateAdded: Date;
}

export const items: Item[] = [
  {
    title: "Car Auction Scraper",
    description: "A project to scrape and analyze car auctions.",
    // image: "/images/car-auction.png",
    href: "/projects/car-auction-scraper",
    dateAdded: new Date("2023-10-05"),
  },
  {
    title: "Random Info Collection",
    description: "A collection of random but useful information.",
    href: "/projects/random-info",
    dateAdded: new Date("2023-10-03"),
  },
  {
    title: "Side Project XYZ",
    description: "An experimental side project of sorts.",
    // image: "/images/side-project.png",
    href: "/projects/side-project-xyz",
    dateAdded: new Date("2023-09-25"),
  },
];
