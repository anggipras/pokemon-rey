import { AppProps } from "next/app";
import Layout from "@components/modules/layout/navbar";
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@styles/global.css";
import "@styles/vars.css";

// Handle route change events
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
