/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

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

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.technology.findMany({
      orderBy: { name: "asc" },
    });
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.technology.findUnique({
      where: { id: input },
    });
  }),

  update: protectedProcedure.input(z.object({
    id: z.string(),
    name: z.string().min(1),
    color: z.string().min(1),
    icon: z.string().min(1),
  })).mutation(async ({ ctx, input }) => {
    return ctx.db.technology.update({
      where: { id: input.id },
      data: {
        name: input.name,
        color: input.color,
        icon: input.icon, 
      },
    });
  }),

  delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.technology.delete({
      where: { id: input },
    });
  }),
});