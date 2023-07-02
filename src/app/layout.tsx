import "../styles/globals.scss";
import type { ReactNode } from "react";
import { Cabin, PT_Sans } from "next/font/google";
import globalContent from "../prevals/globalContent.preval";
import SkipToContent from "../components/SkipToContent";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Ui from "../providers/Ui";
import StringTranslations from "../providers/StringTranslations";

const cabinFont = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin"
});
const ptSansFont = PT_Sans({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-pt-sans"
});

type Props = {
  children: ReactNode
}
export default function RootLayout({ children }: Props) {
  return (
    <html lang="fi" className={`${cabinFont.variable} ${ptSansFont.variable}`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(globalContent.localBusiness) }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <StringTranslations>
          <Ui>
            <SkipToContent />
            <Header />
            <main tabIndex={-1} className="pt-14 flex-1">
              {children}
            </main>
            <Footer />
          </Ui>
        </StringTranslations>
      </body>
    </html>
  );
}