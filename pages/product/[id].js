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
    "image": (product.images && product.images[0]) || product.image,
    "description": product.longDescription || product.shortDescription || product.description,
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
        <title>{String(product.title) + ' — Appsscrip Demo Store'}</title>
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
            {(product.images && product.images.length > 0) ? (
              <div className="gallery">
                {product.images.map((src, i) => (
                  <img key={i} src={src} alt={`${product.title} ${i+1}`} loading="lazy" onError={(e)=>{e.target.onerror=null;e.target.src='/images/product-sample-1.jpg'}} />
                ))}
              </div>
            ) : (
              <img src={product.image} alt={product.title} loading="lazy" onError={(e)=>{e.target.onerror=null;e.target.src='/images/product-sample-1.jpg'}} />
            )}
          </figure>
          <div className="product-info">
            <h2 className="product-price">${product.price}</h2>
            <p className="product-desc">{product.longDescription || product.shortDescription || product.description}</p>
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

export async function getStaticProps(context) {
  const { id } = context.params;
  try {
    console.log('[SSG] Fetching product', id);
    const res = await fetchWithTimeout(`https://fakestoreapi.com/products/${id}`, {}, 4500);
    if (!res.ok) return { notFound: true };
    const product = await res.json();
    console.log('[SSG] Product fetch success', product && product.id);
    return { props: { product }, revalidate: 60 };
  } catch (err) {
    console.error('[SSG] product fetch failed', err?.message || err);
    try {
      const fallback = await import('../../data/sampleProducts.json');
      const products = fallback.default || fallback;
      const product = products.find(p => String(p.id) === String(id));
      console.log('[SSG] Using fallback product data for id', id, !!product);
      if (!product) return { notFound: true };
      return { props: { product }, revalidate: 60 };
    } catch (inner) {
      console.error('[SSG] Failed to load fallback product', inner?.message || inner);
      return { props: { product: null }, revalidate: 60 };
    }
  }
}

export async function getStaticPaths() {
  // Try to pre-generate product pages at build time. Use fallback blocking so Vercel can render new pages if needed.
  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=50');
    const products = await res.json();
    const paths = products && Array.isArray(products)
      ? products.map(p => ({ params: { id: String(p.id) } }))
      : [];
    return { paths, fallback: 'blocking' };
  } catch (err) {
    // Fallback to local data
    try {
      const fallback = await import('../../data/sampleProducts.json');
      const items = fallback.default || fallback;
      const paths = items.map(p => ({ params: { id: String(p.id) } }));
      return { paths, fallback: 'blocking' };
    } catch (inner) {
      return { paths: [], fallback: 'blocking' };
    }
  }
}
