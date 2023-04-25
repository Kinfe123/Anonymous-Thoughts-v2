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
  
  
      <div className="page home">



        <Helmet>
          <meta charSet="utf-8" />
          <title>Profile Page</title>
          {/* <link rel="canonical" href="" /> */}
        </Helmet>


       {/* <div className="flex justify-center items-center flex-col ">

        <img src={data?.profileImageUrl} className="rounded-full w-20 h-20"  />
        <h1>NAME : {data?.firstName} {data?.lastName} (@{data?.username})</h1>
        <h1>EMAIL : {data?.emailAddresses[0]?.emailAddress}</h1>
        <h3>All the posts</h3>
        {datas && datas.map((each) => {
          // eslint-disable-next-line react/jsx-key
          return <h3>{each?.content}</h3>
        })}

        

       </div> */}

        
          <div className="holder w-screen">

          <div className="card border w-96 hover:shadow-none relative flex flex-col mx-auto shadow-lg m-5 w-screen">
            <img className="max-h-20 w-full opacity-80 absolute top-0 z-0 bg-gray-400"  src="https://unsplash.com/photos/h0Vxgz5tyXA/download?force=true&w=640" alt="" />
            <div className="profile w-full flex m-3 ml-4 text-white">
              <img className="w-28 h-28 p-1 bg-white rounded-full z-10" src="https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt=""/>
              <div className="title mt-11 ml-3 font-bold flex flex-col">
                <div className="name break-words text-black z-20">Sarah</div>
         
                <div className="add font-semibold text-sm italic dark text-black">Model</div>
              </div>
            </div>
            <div className="buttons flex absolute bottom-0 font-bold right-0 text-xs text-gray-500 space-x-0 my-3.5 mr-3">
              <div className="add border rounded-l-2xl rounded-r-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white">Contact</div>
             <div className="add border rounded-r-2xl rounded-l-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white">Bio</div>
            </div>
          </div>
          </div>

       
      </div>


    </>

  )



}
export default ProfilePage

