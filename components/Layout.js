import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <hr />
      {children}
    </>
  );
}

export default Layout;
