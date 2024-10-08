/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      technologies: z.array(z.string()),
      link: z.string().optional(),
      order: z.number().optional(),
      live: z.boolean(),
      githubLink: z.string().optional(),
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
          link: input.link,
          githubLink: input.githubLink,
          live: input.live,
          order: input.order,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.project.findMany({
      include: { technologies: true },
      orderBy: { order: "asc" },
    });
  }),
  getTopFour: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.project.findMany({
      take: 4,
      include: { technologies: true },
      orderBy: { order: "asc" },
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
    link: z.string().optional(),
    order: z.number().optional(),
    live: z.boolean(),
    githubLink: z.string().optional(),
  })).mutation(async ({ ctx, input }) => {
    return ctx.db.project.update({
      where: { id: input.id },
      data: {
        title: input.title,
        description: input.description,
        technologies: {
          set: input.technologies.map(id => ({ id })),
        },
        link: input.link,
        order: input.order,
        live: input.live,
        githubLink: input.githubLink,
      },
    });
  }),

  delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.project.delete({
      where: { id: input },
    });
  }),

  getPaginated: publicProcedure
    .input(z.object({
      page: z.number().min(1).default(1),
      pageSize: z.number().min(1).max(50).default(4),
    }))
    .query(async ({ ctx, input }) => {
      const { page, pageSize } = input;
      const skip = (page - 1) * pageSize;

      const [projects, totalCount] = await Promise.all([
        ctx.db.project.findMany({
          skip,
          take: pageSize,
          include: { technologies: true },
          orderBy: { order: "asc" },
        }),
        ctx.db.project.count(),
      ]);

      return {
        projects,
        totalPages: Math.ceil(totalCount / pageSize),
        currentPage: page,
      };
    }),
});