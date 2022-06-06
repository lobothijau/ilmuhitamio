import Document, { Html, Main, NextScript, Head } from "next/document";

import "../styles/globals.css";
import Nav from "./components/nav";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Nav />
      <Component {...pageProps} />

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright
        </a>
      </footer>
    </div>
  );
}

export default MyApp;
