import "../styles/globals.scss";
import type { PropsWithChildren } from "react";
import { Cabin, PT_Sans } from "next/font/google";
import { draftMode } from "next/headers";
import globalContent from "../prevals/globalContent.preval";
import SkipToContent from "../components/SkipToContent";
import Body from "../components/Body";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PreviewInfoBanner from "../components/PreviewInfoBanner";

const cabinFont = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin"
});
const ptSansFont = PT_Sans({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-pt-sans"
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fi" className={`${cabinFont.variable} ${ptSansFont.variable}`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(globalContent.localBusiness) }} />
      </head>
      <Body className="min-h-screen flex flex-col">
        {draftMode().isEnabled && (
          <PreviewInfoBanner />
        )}
        <SkipToContent />
        <Header />
        <main tabIndex={-1} className="pt-14 flex-1">
          {children}
        </main>
        <Footer />
      </Body>
    </html>
  );
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;