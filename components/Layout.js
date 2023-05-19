import Head from "next/head";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <hr />
      {children}
    </>
  );
}

export default Layout;
