// /server/trpc/router/items.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { items, CATEGORIES } from "../../../lib/items";

export const itemsRouter = createTRPCRouter({
  getItems: publicProcedure
    .input(
      z.object({
        query: z.string().optional().default(""),
        category: z
          .enum(["All", ...CATEGORIES] as [string, ...string[]])
          .optional()
          .default("All"),
        sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
      }),
    )
    .query(({ input }) => {
      const { query, category, sortOrder } = input;

      // Filter items based on search query
      let filteredItems = items;

      if (query && query.trim() !== "") {
        const lowerQuery = query.toLowerCase();
        filteredItems = filteredItems.filter((item) => {
          return (
            item.title.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery)
          );
        });
      }

      // Filter by category if not "All"
      if (category !== "All") {
        filteredItems = filteredItems.filter(
          (item) => item.category === category,
        );
      }

      // Sort items by date
      return filteredItems.sort((a, b) => {
        const dateA = new Date(a.dateAdded).getTime();
        const dateB = new Date(b.dateAdded).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    }),
});
