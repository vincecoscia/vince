import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Layout from '../components/layout/Layout'
import '../styles/globals.css'

import { api } from "@/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp);
