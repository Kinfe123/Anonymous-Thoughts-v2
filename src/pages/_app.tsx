import { ClerkProvider } from '@clerk/nextjs';
import type { AppType } from 'next/app'

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <ClerkProvider {...pageProps} >

          <Toaster/>

          <Head>
            <title>Anon Thoughts</title>
            <meta name="description" content="Anon Thoughts" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
        <Component {...pageProps} />
      </ClerkProvider>
};

export default api.withTRPC(MyApp);
