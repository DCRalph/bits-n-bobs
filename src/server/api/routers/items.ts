// /server/trpc/router/items.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { items } from "../../../lib/items";

export const itemsRouter = createTRPCRouter({
  getRecent: publicProcedure.query(() => {
    // Sort items by dateAdded (descending) and return them.
    return items.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
  }),
  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input }) => {
      const { query } = input;
      const lowerQuery = query.toLowerCase();
      return items.filter((item) => {
        return (
          item.title.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery)
        );
      });
    }),
});
