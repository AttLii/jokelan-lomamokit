import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { StringTranslationContext } from '../contexts/stringTranslations.ts'
import { GlobalContentContext } from '../contexts/globalContent.ts'
import stringTranslations from '../prevals/stringTranslations.preval.ts'
import globalContent from '../prevals/globalContent.preval.ts'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
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