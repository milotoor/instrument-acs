import { Html, Head, Main, NextScript } from 'next/document';
import * as React from 'react';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* These control how the app renders on the iOS home screen/in Safari mobile */}
        <link rel="apple-touch-icon" href="/img/logo/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        <link rel="icon" type="image/png" sizes="32x32" href="/img/logo/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/logo/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Loads Roboto fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&family=Roboto:wght@400;700&family=Roboto+Mono:wght@300;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-stone-600 text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
