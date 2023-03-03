import '@/styles/globals.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import HeaderBlock from "@/components/blocks/HeaderBlock.js";
import FooterBlock from "@/components/blocks/FooterBlock.js";

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeaderBlock />
      <Component {...pageProps} />
      <FooterBlock />
    </>
  )
}
