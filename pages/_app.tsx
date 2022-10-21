// Polyfills not provided by next.js
import 'core-js/features/array/at';
import 'core-js/features/string/replace-all';

import 'katex/dist/katex.min.css';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function InstrumentACS({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default InstrumentACS;
