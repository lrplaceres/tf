import "@/styles/globals.css";
import { useRouter } from "next/router";
import "nprogress/nprogress.css";
import "nprogress/nprogress.js";
import { useEffect } from "react";
import NProgress from "nprogress";

export default function App({ Component, pageProps }) {
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

  return <Component {...pageProps} />;
}
