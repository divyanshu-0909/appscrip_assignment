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

async function fetchWithTimeout(url, options = {}, timeout = 4000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { signal: controller.signal, ...options });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const res = await fetchWithTimeout(`https://fakestoreapi.com/products/${id}`, {}, 4500);
    if (!res.ok) return { notFound: true };
    const product = await res.json();
    return { props: { product } };
  } catch (err) {
    console.error('SSR product fetch failed', err?.message || err);
    // Try to load from sample data
    try {
      const fallback = await import('../../data/sampleProducts.json');
      const products = fallback.default || fallback;
      const product = products.find(p => String(p.id) === String(id));
      if (!product) return { notFound: true };
      return { props: { product } };
    } catch (inner) {
      console.error('Failed to load fallback product', inner?.message || inner);
      return { props: { product: null } };
    }
  }
}
