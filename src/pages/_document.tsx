import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="fi">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
