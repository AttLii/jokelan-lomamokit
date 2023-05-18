import '../styles/globals.css'
import type { AppProps } from 'next/app'
import stringTranslations from '../prevals/stringTranslations.preval.ts'
import { StringTranslationContext } from '../contexts/stringTranslations.ts'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <StringTranslationContext.Provider value={stringTranslations}>
      <Component {...pageProps} />
    </StringTranslationContext.Provider>
  )
}

export default App