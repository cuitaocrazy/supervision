// export default MyApp
import Head from 'next/head';
import Script from 'next/script';
import { AppProps } from 'next/app';
import React, { FC } from "react";
import 'tailwindcss/tailwind.css';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';


/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { Provider } from 'react-redux'
import {store} from '../app/store'

import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Provider store={store}><Component {...pageProps} /></Provider>
}

export default MyApp;
