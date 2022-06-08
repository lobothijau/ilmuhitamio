
import "../styles/globals.css";
import Nav from "./components/nav";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Nav />
      <Component {...pageProps} />

      <footer className="bg-blue-800 py-20 text-gray-200 text-center">
        <a
          href="https://twitter.com/gusajisan"
          target="_blank"
          rel="noopener noreferrer"
        >
          © 2022 Bagus Aji Santoso. Made with ❤️ from Cimahi.
        </a>
      </footer>
    </div>
  );
}

export default MyApp;
