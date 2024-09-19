/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

export const experienceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      company: z.string().min(1),
      period: z.string().min(1),
      description: z.string().min(1),
      technologies: z.array(z.string()).optional(),
      order: z.number().min(0),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.experience.create({
        data: {
          title: input.title,
          company: input.company,
          period: input.period,
          description: input.description,
          createdBy: { connect: { id: ctx.session.user.id } },
          technologies: input.technologies ? {
            connect: input.technologies.map(id => ({ id })),
          } : undefined,
          order: input.order,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const experiences = await ctx.db.experience.findMany({
      include: { technologies: true },
      orderBy: { order: "asc" },
    });
    return experiences;
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.experience.findUnique({
      where: { id: input },
      include: { technologies: true },
      
    });
  }),

  update: protectedProcedure.input(z.object({
    id: z.string(),
    title: z.string().min(1),
    company: z.string().min(1),
    period: z.string().min(1),
    description: z.string().min(1),
    technologies: z.array(z.string()),
    order: z.number().min(0),
  })).mutation(async ({ ctx, input }) => {
    return ctx.db.experience.update({
      where: { id: input.id },
      data: {
        title: input.title,
        company: input.company,
        period: input.period,
        description: input.description,
        technologies: {
          set: input.technologies.map(id => ({ id })),
        },
        order: input.order,
      },
    });
  }),

  delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.experience.delete({
      where: { id: input },
    });
  }),
});