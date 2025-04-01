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
  caption: string; // small description
  description?: string; // long description
  image?: string;
  href: string;
  dateAdded: Date;
}

export const items: Item[] = [
  {
    title: "Link2it",
    category: "Projects",
    caption:
      "A link shortener that allows you to shorten links and track the number of clicks.",
    description: `# Overview
Link2it is a robust link shortening platform that caters to modern needs for efficient link management and tracking.

### Features:
- **Shortened URLs:** Generate concise and memorable links ideal for social sharing.
- **Click Analytics:** Monitor detailed statistics like total clicks, geographic origins, device usage, and time-based trends.
- **Dashboard Integration:** Effortlessly manage, organize, and share multiple links through an intuitive dashboard.

### Benefits:
- **Efficiency:** Rapid URL generation and seamless distribution.
- **Data-Driven Insights:** Leverage analytics to optimize your content strategy.
- **Versatility:** Suitable for personal use, small businesses, and large enterprises alike.

### How It Works:
Simply enter your long URL into the system, receive a shortened version instantly, and then track its performance in real time via the integrated analytics dashboard. The platform is thoughtfully designed to integrate with various social media and marketing channels.

### Technology Stack:
- **Backend:** Node.js, Express, MongoDB.
- **Frontend:** React with a focus on responsive design and interactive user experiences.`,
    // image: "/images/car-auction.png",
    href: "https://link2it.cc",
    dateAdded: new Date("2025-3-17"),
  },
  {
    title: "Police codes",
    category: "Resources",
    caption:
      "A list of all the codes used by police over the radio. Codes: Code 1: Response to traffic incidents; Code 2: Emergency assistance required; Code 3: Routine check or surveillance; For more details, please refer to the official police guidelines.",
    description: `## Police Codes Reference
This resource provides a comprehensive and easy-to-navigate list of police codes used in radio communications across various departments.

### Key Details:
- **Code 1:** Typically indicates a response to traffic incidents.
- **Code 2:** Signifies that emergency assistance is required.
- **Code 3:** Denotes a routine check or surveillance operation.

For the most accurate and up-to-date information, please refer to your local police guidelines.`,
    // image: "/images/car-auction.png",
    href: "/projects/police-codes",
    dateAdded: new Date("2025-3-14"),
  },
  {
    title: "Car Scraper",
    category: "Projects",
    caption:
      "Scraps car data from a car turners. I plan to add more websites in the future.",
    description: `## Car Scraper Overview
Car Scraper is an advanced automated tool engineered to extract detailed vehicle information from various car trading websites.

### Features:
- **Data Aggregation:** Collects comprehensive data including pricing, technical specifications, and customer reviews.
- **Multi-Source Support:** Initially supports one car trading website, with plans to expand to additional platforms.
- **Analytics Integration:** Offers fundamental analytics to help users quickly grasp market trends and pricing variations.

### Benefits:
- **Informed Decision-Making:** Compare diverse vehicle listings to find the best deals.
- **User-Friendly Interface:** Intuitive design ensures that critical data is always easy to access and understand.
- **Scalability:** The platform is designed with future growth in mind, promising additional features and extended data sources.

### How It Works:
Car Scraper uses sophisticated web scraping techniques to navigate car trading platforms and extract the relevant data. The collected information is then processed and displayed in a clean, organized dashboard, aiding side-by-side comparisons and in-depth analysis.

### Underlying Technologies:
- **Web Scraping Frameworks:** Uses libraries like Cheerio and Puppeteer for efficient data extraction.
- **Data Processing:** Incorporates robust data cleaning and formatting algorithms.
- **Modern UI/UX:** Built with contemporary frontend technologies to offer a responsive, engaging user experience.`,
    href: "https://cars.w-g.co",
    dateAdded: new Date("2025-2-25"),
  },
];
