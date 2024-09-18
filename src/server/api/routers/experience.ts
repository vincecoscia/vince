import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const experienceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      company: z.string().min(1),
      period: z.string().min(1),
      description: z.string().min(1),
      technologies: z.array(z.string()),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.experience.create({
        data: {
          title: input.title,
          company: input.company,
          period: input.period,
          description: input.description,
          createdBy: { connect: { id: ctx.session.user.id } },
          technologies: {
            connect: input.technologies.map(id => ({ id })),
          },
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.experience.findMany({
      where: { createdById: ctx.session.user.id },
      include: { technologies: true },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Add more procedures as needed (update, delete, etc.)
});