import Head from 'next/head';
import Script from 'next/script';
import React, { FC } from "react";
import 'tailwindcss/tailwind.css';
import '@ionic/react/css/core.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '../styles/global.css';
import '../styles/variables.css';
import '../styles/rich-editor.css';
interface Props {
  Component:any,
  pageProps:any
}
  
// function MyApp({ Component, pageProps }) {
  const MyApp: FC<Props> = ({ Component, pageProps }) =>{
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        ></meta>
      </Head>
      <Component {...pageProps} />
      <Script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></Script>
    </>
  );
}

export default MyApp;
