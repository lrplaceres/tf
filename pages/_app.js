import "@/styles/globals.css";
import { useRouter } from "next/router";
import "nprogress/nprogress.css";
import "nprogress/nprogress.js";
import { useEffect } from "react";
import NProgress from "nprogress";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';

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
