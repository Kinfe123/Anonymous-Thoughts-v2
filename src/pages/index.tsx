import { SignIn, SignInButton, SignOutButton, useUser , UserButton} from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Audio } from 'react-loader-spinner'
import { Helmet } from "react-helmet";
import dayjs from 'dayjs'
import { useState } from "react";
import {toast} from 'react-hot-toast'
import Image from "next/image";

import relativeTime from 'dayjs/plugin/relativeTime'
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";
import { Post } from "@prisma/client";

dayjs.extend(relativeTime)







const Home: NextPage = () => {
  // const {data} = api.example.getAll.useQuery()

  type Authors = {
    username: string;
    id: string;
    profileImageUrl: string;
  }
  const user = useUser()
  const [navbar  , setNavbar] = useState<boolean>(false)
  const { data, isLoading } = api.post.getAll.useQuery()

  const { mutate } = api.post.create.useMutation()
  
  
  // const handleAction = () => {
  //   mutate({content: "Hello wWorld"  , author: user.user?.username , imgUrl: user.user?.profileImageUrl})
   
  // }
  

  


  if (!data && !isLoading) {
    toast.error('Something went wrong')
    return <div>
      Something went wrong
    </div>
  }

  type author = {
    id: string;
    username: string | null;
    profileImageUrl: string;
  }
  const handleClicks = () => {
    return 
  }
  
  type anonCards = RouterOutputs['post']['getAll'][number]
  const AnonCards = (props: anonCards) => {


  
    return (


      // <div>
        
      //    <div className="smoothie-card" onClick={handleClicks}>
      //     <div className="wrapper-card">
      //       <div className="unknown-wrapper">
      //         <Image src = {props?.author.profileImageUrl as string} className="unknown-png"  width={40} height={40} alt={`${props?.author.id as string}`}/>
      //         <Link href={`@${props?.author.username as string}`}><p>@{props?.author.username} </p></Link>


      //       </div>
      //       <Link href={`posts/${props?.post.id as string} `}><h3>{props?.post.content}</h3></Link>
      //       <p className="disc">{props?.post.content}</p>
      //       <p className="disc">{dayjs(props?.post.createdAt).fromNow()}</p>
      //     </div>

      //   </div> 
      // </div>
      
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow bg-slate-100 m-3 mx-3">
            <div className="flex justify-end px-4 pt-4">

              
                <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                    </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={props?.author.profileImageUrl as string} alt="image"/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-black"><Link href={`@${props?.author.username as string}`}><p>@{props?.author.username} </p></Link></h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{props?.post.content}</span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                <div className="like-wrapper flex flex-row justify-center items-center m-2 p-2">
           
                  <button className="liking m-2 text-2xl"
                        
                  >👍 </button>
                  <button className="liking  m-2 text-2xl "
                        
                  >👍 </button>
                  <button className="liking  m-2 text-2xl"
                        
                  >👍 </button>
                  <button className="liking  m-2 text-2xl"
                        
                  >👍 </button>
                  <button className="liking  m-2 text-2xl"
                        
                  >👍 </button>
                  <button className="liking  m-2 text-2xl"
                        
                  >👍 </button>
                  <button className="liking  m-2 text-2xl"
                        
                  >👍 </button>
                 
            </div>
                </div>
            </div>
        </div>


    )

  }


  return (
    <>
     
     
      <div className="page home">



        <Helmet>
          <meta charSet="utf-8" />
          <title>HOME | Anon-Thoughts</title>
          {/* <link rel="canonical" href="" /> */}
        </Helmet>

        <nav>
        <nav className="w-full bg-white shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href="javascript:void(0)">
                            <h2 className="text-2xl font-bold">AnonThoughts</h2>
                        </a>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-gray-600 hover:text-blue-600">
                                <a href="javascript:void(0)">Home</a>
                            </li>
                            <li className="text-gray-600 hover:text-blue-600">
                                <a href="javascript:void(0)">Posts</a>
                            </li>
                            <li className="text-gray-600 hover:text-blue-600">
                                <a href="javascript:void(0)">About US</a>
                            </li>
                            <li className="text-gray-600 hover:text-blue-600">
                            {!user.isSignedIn && <div className="create-tot"><SignInButton /></div>}
                              {!!user.isSignedIn && <div className="create-tot"><UserButton /></div>}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
          {/* <div className="flex justify-between items-center">
            <div>

              <Link className="homes-create" href="/">Home</Link>
              <Link href="/create" className="create-tot">Create Thoughts</Link>
            
            </div>
            <div className="">
              {!user.isSignedIn && <div className="create-tot"><SignInButton /></div>}
              {!!user.isSignedIn && <div className="create-tot"><UserButton /></div>}

            </div>
            


          </div> */}
        </nav>
        <div className="fixed-header">
          {/* <h2 className="homes">Thoughts</h2> */}
          <div className="underline"></div>




        </div>
        <div className="loading">
          <Audio
            height="100"
            width="100"
            color="#5e10ee"
            ariaLabel="audio-loading"
            // className="loader"

            wrapperStyle={{
              position: 'absolute',
              left: '45%',
              zIndex: "1000",
              width: "50px",
              height: "50px",
              marginBottom: "40px",


            }}
            wrapperClass="wrapper-class"
            visible={isLoading}

          />
        </div>




        <div className="smoothie-grid grid p-4  lg:grid-cols-3 md:grid-col-2 sm:grid-cols-1 ">
          {data && data.map(anon => (
            // console.log(anon)

            <AnonCards key={anon?.post.id} post={anon?.post as Post} author={anon?.author as Authors} />

          ))}
        </div>
      </div>


    </>

  )
}
{/* <main className="h-full h-screen">
        <div className="">

        <div className=''>

         {!user.isSignedIn && <div><SignInButton/></div>}
         {!!user.isSignedIn && <div><SignOutButton/></div>}

        </div>

        <div>

          { data && data.map(post => (<div key={post.id}> {post.content}</div>))}
        </div>

        </div> */}

// </main>


export default Home;
