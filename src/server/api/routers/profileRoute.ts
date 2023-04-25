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

// Create a new ratelimiter, that allows 10 requests per 10 seconds)

export const profileRoute = createTRPCRouter({
    getUserByUsername: publicProcedure.input(z.object({username: z.string()})).query(async ({input}) => {
        const [user] = await clerkClient.users.getUserList({
            username: [input.username]
        })
      
        if(!user) {
            throw new TRPCError({code:"NOT_FOUND"})
        }
        return user;
    })
  
 
     
 })

  
