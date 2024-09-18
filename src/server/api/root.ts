import { postRouter } from "@/server/api/routers/post";

import { experienceRouter } from "@/server/api/routers/experience";
import { technologyRouter } from "@/server/api/routers/technology";
import { projectRouter } from "@/server/api/routers/project";
import { blogRouter } from "@/server/api/routers/blog";
import { createTRPCRouter, createCallerFactory } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  experience: experienceRouter,
  technology: technologyRouter,
  project: projectRouter,
  blog: blogRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
