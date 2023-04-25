import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { postRouter } from "~/server/api/routers/postRoute";
import { profileRoute } from "./routers/profileRoute";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({

    post: postRouter,
    profile:profileRoute,
});

// export type definition of API
export type AppRouter = typeof appRouter;
