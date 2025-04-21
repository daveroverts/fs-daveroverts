import Document, { Head, Html, Main, NextScript } from "next/document";
import { ReactElement } from "react";

class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png?v=2"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
          <link rel="shortcut icon" href="/favicon.ico?v=2" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png?v=2"
          />
          <meta name="apple-mobile-web-app-title" content="FS DR" />
          <link rel="manifest" href="/site.webmanifest?v=2" />
        </Head>
        <body className="dark:bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
