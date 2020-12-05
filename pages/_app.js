import "../styles/globals.css";
import "../styles/bootstrap.min.css";
import React from "react";
import { createStore } from "redux";
import { reducer } from "./../reducer/index";
import { Provider } from "react-redux";
import { loadState, saveState } from "../localStorage";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  const persistState = loadState();
  const store = createStore(reducer, persistState);
  store.subscribe(() => {
    saveState(store.getState());
  });
  return (
    <Provider store={store}>
      <Head>
        <title>Hesapkurdu case</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
      <div className="container">
        Emre Birkan Kervan tarafından hesapkurdu için yapılmıştır.
      </div>
    </Provider>
  );
}

export default MyApp;
