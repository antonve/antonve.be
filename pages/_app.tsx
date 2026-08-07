import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Merriweather, Open_Sans } from 'next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-open-sans',
  display: 'swap',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`${openSans.variable} ${merriweather.variable} font-sans max-w-4xl mx-auto px-4 md:px-6`}
      >
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}
