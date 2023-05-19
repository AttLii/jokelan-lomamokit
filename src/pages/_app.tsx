import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { StringTranslationContext } from '../contexts/stringTranslations.ts'
import { GlobalContentContext } from '../contexts/globalContent.ts'
import stringTranslations from '../prevals/stringTranslations.preval.ts'
import globalContent from '../prevals/globalContent.preval.ts'
import Head from 'next/head'
import { Cabin, PT_Sans } from "next/font/google"
import { Footer } from '../components/Footer.tsx'

const cabinFont = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin"
})
const ptSansFont = PT_Sans({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-pt-sans"
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={`${cabinFont.variable} ${ptSansFont.variable}`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(globalContent.localBusiness) }} />
      </Head>
      <GlobalContentContext.Provider value={globalContent}>
        <StringTranslationContext.Provider value={stringTranslations}>
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </StringTranslationContext.Provider>
      </GlobalContentContext.Provider>
    </div>
  )
}

export default App