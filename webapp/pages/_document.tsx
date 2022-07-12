import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&family=Roboto:wght@400;700&family=Roboto+Mono:wght@300;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-slate-800 text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
