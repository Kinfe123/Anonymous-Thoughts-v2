import type { User } from "@clerk/nextjs/dist/api";
import { clerkClient  } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { string, z } from "zod";
import { useUser } from "@clerk/nextjs";

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

const filteredUser = (user: User) => {
  return { id: user.id, username: user.username, profileImageUrl: user.profileImageUrl }
}

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,

})

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
       
        
        if(author){
        
          return {
            post,
            author: {
              ...author,
              username: author.username,
              
              
            }
          }

        }
        if (!author) {

          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: "Author not found" })

        }
      




      }
    })



  }),

  getPostById: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    const post = await ctx.prisma.post.findUnique({
      where: { id: input.id },
    });

    if (!post)
      throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });

    const user = await clerkClient.users
      .getUser(post!.authorId)
      .then(filteredUser);

 
    if (!user)
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

    return { ...post, user };
  }),
  create: privateProcedure.input(z.object({
    content: z.string(), 
    author:z.string(),
    imgUrl: z.string()
  })).mutation(async ({ctx  , input})=> {
    const {content} = input;

     const authorId = ctx.currentUser.userId!
     const res = await ratelimit.limit(authorId)
     if(!res.success) {
      throw new TRPCError({code:'TOO_MANY_REQUESTS'})
     }

    const author = ctx.currentUser.user?.username
    const imgUrl = ctx.currentUser.user?.profileImageUrl
  
    const post = await ctx.prisma.post.create({
      data: {
        authorId: authorId as string,
        author:input.author,
        imgUrl:input.imgUrl,
        content:input.content,


        
         

      

      }
    })

    return post
  })
     
 })

  
