import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static getInitialProps({
    renderPage
  }: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();

    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );

    const styles = sheet.getStyleElement();

    return new Promise(resolve => {
      resolve({ ...page, styles });
    });
  }

  render() {
    return (
      <html>
        <Head>{this.props.styles}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
