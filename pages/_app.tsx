import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/common/Header";
import styles from "../styles/Home.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
