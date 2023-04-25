import type { User } from "@clerk/nextjs/dist/api";
import { clerkClient  } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { string, z } from "zod";
import { useUser } from "@clerk/nextjs";


import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

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
  create: privateProcedure.input(z.object({
    content: z.string(), 
    author:z.string(),
    imgUrl: z.string()
  })).mutation(async ({ctx  , input})=> {
    const {content} = input;

     const authorId = ctx.currentUser.userId 
   console.log( ctx.currentUser.user?.username)
    const author = ctx.currentUser.user?.username
    const imgUrl = ctx.currentUser.user?.profileImageUrl
  
    const post = await ctx.prisma.post.create({
      data: {
        authorId: authorId,
        author:input.author,
        imgUrl:input.imgUrl,
        content:input.content,


        
         

      

      }
    })

    return post
  })
     
 })

  
