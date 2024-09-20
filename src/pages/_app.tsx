import { ThemeProvider } from 'next-themes'
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import ConditionalLayout from '../components/layout/ConditionalLayout'
import '../styles/globals.css'
import { Toaster } from '@/components/ui/toaster'
import Head from 'next/head'

import { api } from "@/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>vincecoscia</title>
        <meta name="description" content="Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} >
        <ConditionalLayout>
          <Component {...pageProps} />

        </ConditionalLayout>
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp);
