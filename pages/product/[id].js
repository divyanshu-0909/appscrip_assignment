import Head from 'next/head';

export default function ProductPage({ product }) {
  if (!product) {
    return (
      <div className="container">
        <Head>
          <title>Product not found</title>
        </Head>
        <main>
          <h1>Product not found</h1>
        </main>
      </div>
    );
  }

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": product.image,
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Thing",
      "name": product.category
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": product.price,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="container">
      <Head>
        <title>{product.title} — Appsscrip Demo Store</title>
        <meta name="description" content={product.description.substring(0, 150)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <header className="site-header">
        <h1>{product.title}</h1>
        <p className="lead">Product details — SSR page with product schema</p>
      </header>

      <main>
        <section className="product-detail">
          <figure className="product-media">
            <img src={product.image} alt={product.title} loading="lazy" />
          </figure>
          <div className="product-info">
            <h2 className="product-price">${product.price}</h2>
            <p className="product-desc">{product.description}</p>
            <p className="product-cat">Category: {product.category}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) return { notFound: true };
    const product = await res.json();
    return { props: { product } };
  } catch (err) {
    console.error(err);
    return { props: { product: null } };
  }
}
