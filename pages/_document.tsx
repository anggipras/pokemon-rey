import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from "next/document";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";

const key = "custom";
const cache = createCache({ key });
const { extractCritical } = createEmotionServer(cache);

export default class MyDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext,
    ): Promise<DocumentInitialProps> {
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) =>
                    (
                        <CacheProvider value={cache}>
                            <App {...props} />
                        </CacheProvider>
                    ),
                enhanceComponent: (Component) => Component,
            });

        const initialProps = await Document.getInitialProps(ctx);
        const styles = extractCritical(initialProps.html);
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    <style
                        data-emotion={`${key} ${styles.ids.join(" ")}`}
                        dangerouslySetInnerHTML={{ __html: styles.css }}
                    />
                </>
            ),
        };
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
