/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { SignIn, SignInButton, SignOutButton, useUser , UserButton} from "@clerk/nextjs";
import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { Helmet } from "react-helmet";
import dayjs from 'dayjs'
import { Post } from "@prisma/client";
import { RouterOutputs, api } from "~/utils/api";

import { useRouter } from "next/router";








const ProfilePage: NextPage = () => {

  // const {data} = api.example.getAll.useQuery()
  type Authors = {
    username: string;
    id: string;
    profileImageUrl: string;
  }
  const user = useUser()

  const router = useRouter()


  const {data , isLoading} = api.profile.getUserByUsername.useQuery({
    username: router.query.username?.slice(1) as string
  })
//   console.log("The data coming from the profile page : " ,data)

  const {data: fetchedOne } = api.post.getPostById.useQuery({
    id: data?.id as string
  })
  const {data: datas } = api.post.getPostByAuthor.useQuery({
    authorId: data?.id as string,
  })
  if(isLoading) { 
    return <h1>Loading....</h1>
}
 

  type anonCards = RouterOutputs['post']['getAll'][number]
  



  return (
    <>
  
      <div className="bug">Bug Renport</div>
      <div className="page home">



        <Helmet>
          <meta charSet="utf-8" />
          <title>Profile Page</title>
          {/* <link rel="canonical" href="" /> */}
        </Helmet>


       <div className="flex justify-center items-center flex-col ">

        <img src={data?.profileImageUrl} className="rounded-full w-20 h-20"  />
        <h1>NAME : {data?.firstName} {data?.lastName} (@{data?.username})</h1>
        <h1>EMAIL : {data?.emailAddresses[0]?.emailAddress}</h1>
        <h3>All the posts</h3>
        {datas && datas.map((each) => {
          // eslint-disable-next-line react/jsx-key
          return <h3>{each?.content}</h3>
        })}

        

       </div>

       
      </div>


    </>

  )



}
export default ProfilePage

