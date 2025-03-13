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
    title: "Police codes",
    description: "A list of all the codes used by police over the radio.",
    // image: "/images/car-auction.png",
    href: "/projects/police-codes",
    dateAdded: new Date("2025-3-14"),
  },
  {
    title: "Car Scraper",
    description: "Scraps car data from a car turners. I plan to add more websites in the future.",
    href: "https://cars.w-g.co",
    dateAdded: new Date("2025-2-25"),
  }
];
