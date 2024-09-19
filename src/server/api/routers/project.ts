import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      technologies: z.array(z.string()),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({
        data: {
          title: input.title,
          description: input.description,
          createdBy: { connect: { id: ctx.session.user.id } },
          technologies: {
            connect: input.technologies.map(id => ({ id })),
          },
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.project.findMany({
      include: { technologies: true },
      orderBy: { createdAt: "desc" },
    });
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.project.findUnique({
      where: { id: input },
      include: { technologies: true },
    });
  }),

  update: protectedProcedure.input(z.object({
    id: z.string(),
    title: z.string().min(1),
    description: z.string().min(1),
    technologies: z.array(z.string()),
  })).mutation(async ({ ctx, input }) => {
    return ctx.db.project.update({
      where: { id: input.id },
        data: {
        title: input.title,
        description: input.description,
        technologies: {
          connect: input.technologies.map(id => ({ id })),
        },
      },
    });
  }),

  delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.project.delete({
      where: { id: input },
    });
  }),
});