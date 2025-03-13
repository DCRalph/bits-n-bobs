// /app/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const recentItems = api.items.getRecent.useQuery();
  const searchItems = api.items.search.useQuery({ query: searchQuery });

  // Use search results if a query exists; otherwise, use recent items.
  const items = searchQuery.trim() ? searchItems.data : recentItems.data;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="container mx-auto p-8 text-center">
        <h1 className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-6xl font-extrabold text-transparent drop-shadow-lg md:text-8xl">
          bits n bobs
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300 md:text-xl">
          A bunch of my random projects and some useful information.
        </p>
        <p className="mt-2 text-lg text-gray-400">
          Made by{" "}
          <a
            href="https://williamgiles.co.nz"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-blue-500 hover:underline"
          >
            William
          </a>{" "}
          in conjunction with{" "}
          <a
            href="https://dcralph.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-blue-500 hover:underline"
          >
            DCRalph Enterprises
          </a>
          .
        </p>
        <p className="mt-1 text-gray-500">
          Designed by monkeys with a drinking problem. 🐒🍺
        </p>
      </header>

      <main className="container mx-auto p-4">
        <div className="my-8 flex justify-center">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md rounded border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <section>
          {searchQuery && searchItems.isLoading && (
            <p className="text-center text-gray-400">Searching...</p>
          )}
          {!searchQuery && recentItems.isLoading && (
            <p className="text-center text-gray-400">Loading recent items...</p>
          )}
          <ul className="space-y-6">
            {items?.map((item) => (
              <li
                key={item.href}
                className="rounded border border-gray-700 bg-gray-800 p-6 transition hover:shadow-xl"
              >
                <a
                  href={item.href}
                  className="text-2xl font-semibold text-blue-400 hover:text-blue-500"
                >
                  {item.title}
                </a>
                <p className="mt-2 text-sm text-gray-400">
                  Added on {new Date(item.dateAdded).toLocaleDateString()}
                </p>
                <p className="mt-4">{item.description}</p>
                {item.image && (
                  <div className="mt-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="rounded"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
