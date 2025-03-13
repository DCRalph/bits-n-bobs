import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { policeCodes } from "../../../lib/policeCodes";

export const policeCodesRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return policeCodes;
  }),
  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input }) => {
      const { query } = input;
      const lowerQuery = query.toLowerCase();
      const result: Record<string, (typeof policeCodes)[string]> = {};

      for (const section in policeCodes) {
        const filtered = (policeCodes[section] ?? []).filter((code) => {
          return (
            code.CODE.toLowerCase().includes(lowerQuery) ||
            code.DESCRIPTION.toLowerCase().includes(lowerQuery)
          );
        });
        if (filtered.length > 0) {
          result[section] = filtered;
        }
      }
      return result;
    }),
});
