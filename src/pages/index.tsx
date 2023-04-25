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

  const { data, isLoading } = api.post.getAll.useQuery()

  const { mutate } = api.post.create.useMutation()

  const {data:IdData } = api.post.getPostById.useQuery({
    id: 'clgakotbv0000jvbkmt4vxu85'
  })
  console.log(IdData)
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


      <div>
        
         <div className="smoothie-card" onClick={handleClicks}>
          <div className="wrapper-card">
            <div className="unknown-wrapper">
              <Image src = {props?.author.profileImageUrl as string} className="unknown-png"  width={40} height={40} alt={`${props?.author.id as string}`}/>
              <Link href={`@${props?.author.username as string}`}><p>@{props?.author.username} </p></Link>


            </div>
            <Link href={`posts/${props?.post.id as string} `}><h3>{props?.post.content}</h3></Link>
            <p className="disc">{props?.post.content}</p>
            <p className="disc">{dayjs(props?.post.createdAt).fromNow()}</p>
          </div>

        </div> 
      </div>

    )

  }


  return (
    <>
     
      <div className="bug">Bug Report</div>
      <div className="page home">



        <Helmet>
          <meta charSet="utf-8" />
          <title>HOME | Anon-Thoughts</title>
          {/* <link rel="canonical" href="" /> */}
        </Helmet>

        <nav>
          <div className="flex justify-between items-center">
            <div>

              <Link className="homes-create" href="/">Home</Link>
              <Link href="/create" className="create-tot">Create Thoughts</Link>
            
            </div>
            <div className="">
              {!user.isSignedIn && <div className="create-tot"><SignInButton /></div>}
              {!!user.isSignedIn && <div className="create-tot"><UserButton /></div>}

            </div>
            {/* <Link to="/about" className="create-tot">About Anon</Link> */}


          </div>
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




        <div className="smoothie-grid">
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
