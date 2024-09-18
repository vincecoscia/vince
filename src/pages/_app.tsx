import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Layout from '../components/layout/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
