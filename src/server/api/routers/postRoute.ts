import type { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { string, z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


const filteredUser = (user: User) => {
  return { id: user.id, username: user.username, profileImageUrl: user.profileImageUrl }
}
export const postRouter = createTRPCRouter({

  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany(
      {
        take: 100,
      }
    )
    const users = (await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId ),
      limit: 100,
    })).map(filteredUser)
    return posts.map((post) => {
      {

        const author = users.find((user) => user.id === post.authorId)
        if (!author) {

          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: "Author not found" })

        }
        return {
          post,
          author: {
            ...author,
            username: author.username,
            
            
          }
        }




      }
    })



  }),
  create: publicProcedure
    .input(z.object({ content: z.string(), author: z.string(), imgUrl: z.string(), authorId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { content, author, imgUrl, authorId } = input

      return ctx.prisma.post.create({
        data: {
          content,
          author,
          imgUrl,
          authorId,

        }
      })
    })
});
