import "@/styles/globals.css";
import { useRouter } from "next/router";
import "nprogress/nprogress.css";
import "nprogress/nprogress.js";
import { useEffect } from "react";
import NProgress from "nprogress";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";
import { NotasProvider } from "@/context/notasContext";
import { SessionProvider } from "next-auth/react";
import nProgress from "nprogress";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouterChange = (url) => {
      NProgress.start();
    };
    router.events.on("routeChangeStart", handleRouterChange);
    router.events.on("routeChangeComplete", () => NProgress.done());
    return () => {
      router.events.off("routeChangeStart", handleRouterChange);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <NotasProvider>
        <Component {...pageProps} />
      </NotasProvider>
    </SessionProvider>
  );
}
