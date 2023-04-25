import { SignIn, SignInButton, SignOutButton, useUser , UserButton} from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FaArrowLeft , FaCheck } from "react-icons/fa"
import { Audio } from "react-loader-spinner"

import { Helmet } from "react-helmet";
import dayjs from 'dayjs'

import { api } from "~/utils/api";

import { useRouter } from "next/router";








const ProfilePage: NextPage = () => {
  // const {data} = api.example.getAll.useQuery()

  const user = useUser()

  const router = useRouter()

  const { data:datas, isLoading } = api.post.getPostById.useQuery({
    id: router.query.id as string
  })
  if(isLoading) {
    return <div>Loading...</div>
  }
  



  



  return (
    <>
        <div className="post-detail">
                <div className="loading">
            <Audio
            height="100"
            width="100"
            color="#5e10ee"
            ariaLabel="audio-loading"
           
            
            wrapperStyle={{
                position: 'absolute',
                left: '45%',
                zIndex: "1000",
                width:"50px",
                height:"50px",
                marginBottom:"40px",
            
  
    }}
    wrapperClass="wrapper-class"
    visible={isLoading}

    />
   
    
    </div>
    {datas && (
     <div className="details">
         <Link className="homes-creates back" href="/"> 
             < FaArrowLeft />
         </Link>
         
         <div className="descr">
             <div className="outliner">
                <h2>Author:  {datas.author}</h2>
                <p className="bodies">{datas.content}</p>
                {/* <div className="likesanddislike">
                    <p>{datas.likes} likes</p>
                    <p>{datas.dislikes} Dislikes</p>
                </div> */}

             </div>
        
             {/* <p>Share Comment</p>
             <textarea type="text" className="comments" onChange={(e) => setComment(e.target.value)} value={comment}/>
             <button className="post-comment" onClick={handleCommentPost}>Post a Comment <span className="post-icon"><FaCheck /></span></button>
              */}
         </div>
         {/* <span onClick={handleLoad} className="load">  {!displayComment  ? <span>Load Comments  🔽</span>  : <span>Hide Comments  🔼</span> }</span> */}
         <div>
             
         </div>
     </div>
    )}
        </div>



        </>

  )
}


export default ProfilePage;
