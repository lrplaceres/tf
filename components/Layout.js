import Head from "next/head";
import Navbar from "./Navbar";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";

function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <hr />
      <Container maxWidth="xl">{children}</Container>
      <ToastContainer />
    </>
  );
}

export default Layout;
