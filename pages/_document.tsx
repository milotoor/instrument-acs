import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* These control how the app renders on the iOS home screen/in Safari mobile */}
        <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Loads Roboto fonts */}
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
