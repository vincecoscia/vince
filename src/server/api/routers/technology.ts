import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const technologyRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      color: z.string().min(1),
      icon: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.technology.create({
        data: {
          name: input.name,
          color: input.color,
          icon: input.icon,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.technology.findMany({
      where: { createdById: ctx.session.user.id },
      orderBy: { name: "asc" },
    });
  }),

  // Add more procedures as needed (update, delete, etc.)
});