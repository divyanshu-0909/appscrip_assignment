import Document, { Html, Head, Main, NextScript } from 'next/document';

class AppDocument extends Document {
  render() {
    // Minimal document sizing with schema for the site
    const schemaOrg = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Appsscrip Demo Store",
      "url": "https://example.com"
    };

    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#111827" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
