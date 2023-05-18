import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { StringTranslationContext } from '../contexts/stringTranslations.ts'
import { GlobalContentContext } from '../contexts/globalContent.ts'
import stringTranslations from '../prevals/stringTranslations.preval.ts'
import globalContent from '../prevals/globalContent.preval.ts'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <GlobalContentContext.Provider value={globalContent}>
        <StringTranslationContext.Provider value={stringTranslations}>
          <Component {...pageProps} />
        </StringTranslationContext.Provider>
      </GlobalContentContext.Provider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(globalContent.localBusiness) }} />
    </>
  )
}

export default App