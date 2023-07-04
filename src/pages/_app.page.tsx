import '@/styles/globals.css';

import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  weight: ['400', '500', '700'],
  subsets: ['latin']
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <main className={`${nunito.className}`}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  )
}
