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
    title: "This",
    category: "Projects",
    caption: "This website is a collection of links to various resources.",
    image: "/images/xp shrek.jpg",
    description: `# This Website

Welcome, to my digital shitshow. Yeah, I decided to write about my own damn website because, clearly, I'm a narcissistic prick who loves to waste time. You're here whether you like it or not, so buckle the fuck up for a wild ride through tech mess, flashy animations, and the altar of overengineering.

## What the Is Running This Digital Dumpster Fire?

This miserable excuse for a website is powered by **Next.js** - because who the hell isn't riding the Next.js bandwagon these days? The utterly gratuitous visual jazz hands come courtesy of **Framer Motion**, which I use to spawn floating gradient blobs that not only drain your battery but also your will to live.

I've thrown together a tech stack that's as pretentious as it is unnecessary:
- **React** - yeah, it's 2025 already. Get with the fuckin' times.
- **Tailwind CSS** - because writing actual, handcrafted CSS is so 2015, and let's face it: I'm too damn lazy.
- **tRPC** for type-safe API calls, saving me from debugging runtime errors while I guzzle down my morning coffee.
- **Lucide icons** - not because I give a shit, but because they look damn good next to my half-baked code.
- **next-themes** for that dark mode toggle you probably flipped once and forgot about while scrolling through more meaningless content.

And let's not forget the animations - non-stop, overblown, and completely unnecessary:
1. Floating gradient blobs that hypnotize your eyeballs and mock your attention span.
2. Fancy card hover effects screaming, "Look at me, you dipshit, I'm a coding genius!"
3. A rotating sparkle by the title because, of course, shiny shit distracts you from the underlying mess.

## Because I Fucking Can - A Brag of Overengineering

Sure, I built this overengineered clusterfuck of a site just because I can. Did I need to deploy Framer Motion for every single damn element? Fuck no. But if you're still dragging your sorry ass here to read my self-indulgent drivel, then either you're a glutton for punishment or just as hooked on shiny distractions as I am. In this twisted carnival of code, feel free to steal any damn snippet you want—I'm not claiming original genius here. It's all a patchwork of borrowed and barely-broken hacks from a pile of overambitious ideas.

## What's Next? MSAILS (More Shit As I Learn Shit)

News flash: this digital dumpster isn't going anywhere. I'm a mad bastard who picks up new tricks and tosses random crap into this site like a drunken carpenter haphazardly nailing planks together. Expect more random, pointless features to be added as I continue to learn new shit and feed my insatiable need to overcomplicate everything. Whether it's a bizarre widget, another flashy-ass animation, or some half-assed experiment, I'll keep churning out this digital mess because:
- I can.
- I don't give a flying fuck about conventional design rules.
- And frankly, watching this mess evolve is more fun than makeing something meaningful.

Buckle up, you miserable bastards. The next update is going to be as unpredictable as my mood swings, and if you don't like it, tough shit. I'm not here to pander to your fragile expectations.

## Final  Thoughts

Screw perfection. Screw convention. I don't give a flying fuck about pleasing anyone's delicate sensibilities. This site is my playground of chaotic code and half-finished experiments, a monument to my relentless pursuit of overkill wrapped in a snarkfest of profanity. So, sit back, relax (or don't), and enjoy the ride through this beautifully disorganized dumpster fire of digital nonsense.

Now, get lost if you want, but remember: in this madhouse, we're all just dancing to the crazy tune of our own twisted version of reality. Cheers, bastards, and stay as unpredictable as a damn lemur on a sugar rush.
`,
    href: "https://link2it.cc",
    dateAdded: new Date("2025-4-1"),
  },
  {
    title: "Link2it",
    category: "Projects",
    caption:
      "A link shortener that allows you to shorten links and track the number of clicks.",
    description: `# Overview
Link2it is a robust link shortening platform that caters to modern needs for efficient link management and tracking.

`,
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

### Ill put some more info here later.

`,
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

Websites scraped from:
- Turners

`,
    href: "https://cars.w-g.co",
    dateAdded: new Date("2025-2-25"),
  },
];
