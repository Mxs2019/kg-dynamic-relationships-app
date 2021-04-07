import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-screen-sm mx-auto p-4 bg-white border shadow-sm rounded-sm">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
