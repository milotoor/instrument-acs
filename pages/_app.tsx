// Polyfills not provided by next.js
import 'core-js/features/array/at';
import 'core-js/features/string/replace-all';

import Amplify from '@aws-amplify/core';
import 'katex/dist/katex.min.css';
import type { AppProps } from 'next/app';
import config from '../lib/aws-exports';
import '../styles.css';

Amplify.configure(config);

function InstrumentACS({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default InstrumentACS;
