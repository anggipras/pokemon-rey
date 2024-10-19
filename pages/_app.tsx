import { AppProps } from "next/app";
import Layout from "@components/modules/layout/navbar";
import "@styles/global.css";
import "@styles/vars.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
