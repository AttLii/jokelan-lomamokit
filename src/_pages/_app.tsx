import '../styles/globals.scss';
import { useEffect, useReducer, useRef } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Cabin, PT_Sans } from "next/font/google";
import stringTranslations from '../prevals/stringTranslations.preval.ts';
import globalContent from '../prevals/globalContent.preval.ts';
import { StringTranslationContext } from '../contexts/stringTranslations.ts';
import { UiContext, initialState as uiInitialState, reducer as uiReducer } from '../contexts/ui.tsx';
import Footer from '../components/Footer.tsx';
import SkipToContent from '../components/SkipToContent.tsx';
import { GlobalContentContext } from '../contexts/globalContent.ts';
import Header from '../components/Header.tsx';

const cabinFont = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin"
});
const ptSansFont = PT_Sans({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-pt-sans"
});

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [uiState, uiDispatch] = useReducer(uiReducer, uiInitialState);
  const main = useRef<HTMLElement | null>(null);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      uiDispatch({ type: "NAV_CLOSE" });
      (document.activeElement as HTMLElement)?.blur();
    });
  }, [router.events]);

  useEffect(() => {
    const scrollLockClasses = ["overflow-hidden", "sm:overflow-auto"];
    uiState.navOpen
      ? document.body.classList.add(...scrollLockClasses)
      : document.body.classList.remove(...scrollLockClasses);
  }, [uiState.navOpen]);

  return (
    <div className={`${cabinFont.variable} ${ptSansFont.variable} min-h-screen flex flex-col`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(globalContent.localBusiness) }} />
      </Head>
      <GlobalContentContext.Provider value={globalContent}>
        <StringTranslationContext.Provider value={stringTranslations}>
          <UiContext.Provider value={{ state: uiState, dispatch: uiDispatch }}>
            <SkipToContent />
            <Header />
            <main ref={main} tabIndex={-1} className="pt-14 flex-1">
              <Component {...pageProps} />
            </main>
            <Footer />
          </UiContext.Provider>
        </StringTranslationContext.Provider>
      </GlobalContentContext.Provider>
    </div>
  );
};

export default App;