import type { Post } from '@prisma/client'
import React from 'react'
import type { RouterOutputs } from '~/utils/api'
import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

type anonProps = RouterOutputs['post']['getAll'][0]

type author =  {
    id: string;
    username: string | null;
    profileImageUrl: string;
}
function AnonCards({post , author} : {post: Post , author: author}) {
    
   
  
  
    const handleClicks = () => {
        return 

    }
    return (
        <div>

            <div className="smoothie-card" onClick={handleClicks}>
                <div className="wrapper-card">
                    <div className="unknown-wrapper">
                        <Image src={author.profileImageUrl} className='unknown-png' alt={`${author.id} profile picture` } width={100} height={100} placeholder='blur
                        '/>
                        <p>@{author.username} </p>
                       

                    </div>
                    <h3>{post.content}</h3>
                    <p className="disc">{post.content}</p>
                    <p className="disc">{dayjs(post.createdAt).fromNow()}</p>
                </div>

            </div>
        </div>
    )
}

export default AnonCards