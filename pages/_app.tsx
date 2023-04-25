import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
//import { Provider } from "react-redux";
//import { store } from "../app/store";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
