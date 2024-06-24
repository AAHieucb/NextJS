import '../styles/globals.css'

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import store from '../store'

export default function MyApp({ Component, pageProps }: AppProps) {
  console.log("Test");
  return (
    <Provider store={store}>
      <Component {...pageProps} ref={console.log("ABC")}/>
    </Provider>
  )
}
