import { ThemeProvider } from 'next-themes'
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import ConditionalLayout from '../components/layout/ConditionalLayout'
import '../styles/globals.css'
import { Toaster } from '@/components/ui/toaster'

import { api } from "@/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ConditionalLayout>
          <Component {...pageProps} />
        </ConditionalLayout>
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp);
