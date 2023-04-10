import React from 'react'
import Head from "next/head";
import Link from "next/link";
import { Audio } from 'react-loader-spinner'
import { Helmet } from "react-helmet";
import { useState } from 'react';
import { api } from "~/utils/api";
import { SignInButton, useUser } from '@clerk/nextjs';

function Create() {


  const user = useUser()
  

  const {data: fetchedData , refetch:fetchedReferesh } = api.post.getAll.useQuery()

  const {mutate: createAnon , isLoading } = api.post.create.useMutation(
    {
      onSuccess: () => {
        void fetchedReferesh()

      }
    }
  );

  const [title, setTitle] = useState('')
  const [name, setName] = useState('')

  const [body, setBody] = useState('')


  // const {data , }
  const handleSubmit = () => {
    createAnon({
      content: body,
      author: user.user?.username as string,
      imgUrl: user.user?.profileImageUrl as string,
      authorId: user.user?.id  as string,
    })


    
    return


  }
  return (
    <>
      {user ? (
        <>
          <div>
            <div>
              <div className="page create">
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>Create Thoughts | Anon-Thoughts</title>
                  {/* <link rel="canonical" href="http://mysite.com/example" /> */}
                </Helmet>

                <form onSubmit={handleSubmit}>
                

                  <label htmlFor="method">Tell Them What You Got:</label>
                  <textarea
                    id="method"
                    className=' bg-black'
                    maxLength={200}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />

                  <div className="together">

                    <button>Post This Thought</button>



                    <div className="loading-for-create">
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
                          marginBottom: "20px",


                        }}
                        wrapperClass="wrapper-class"
                        visible={isLoading}
                      />

                    </div>
                  </div>



                  {/* {formError && <p className="error">{formError}</p>} */}
                </form>
              </div>
            </div>

          </div>

        </>
      ) : (<div>
        { <div className="create-tot"><SignInButton /></div>}

      </div>)}

    </>
  )
}

export default Create