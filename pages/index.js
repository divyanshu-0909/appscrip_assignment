import Head from 'next/head';
import ProductCard from '../components/ProductCard';
import { useState, useMemo } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import { useFilterContext } from '../context/FilterContext';
import PLPHeader from '../components/PLPHeader';
import FloatingAvatars from '../components/FloatingAvatars';

export default function Home({ products }) {
  const { filtersVisible, setFiltersVisible, isMobile } = useFilterContext();
  const [filter, setFilter] = useState({ categories: [], search: '', minPrice: 0, maxPrice: 999999, sort: '' });

  const filtered = useMemo(() => {
    let items = products.slice();
    // Apply category filter
    if (filter.categories && filter.categories.length) {
      items = items.filter(p => filter.categories.includes(p.category));
    }
    // Search
    if (filter.search) {
      const s = filter.search.toLowerCase();
      items = items.filter(p => p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
    }
    // Price
    items = items.filter(p => p.price >= (filter.minPrice || 0) && p.price <= (filter.maxPrice || 999999));
    // Sort: handle several values
    if (filter.sort === 'price-asc') items.sort((a,b) => a.price - b.price);
    if (filter.sort === 'price-desc') items.sort((a,b) => b.price - a.price);
    if (filter.sort === 'popular') items.sort((a,b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    if (filter.sort === 'newest') items.sort((a,b) => b.id - a.id);
    return items;
  }, [products, filter]);
  // `isMobile` and `filtersVisible` are handled at the FilterContext level.

  return (
    <div className="container">
      <Head>
        <title>Appsscrip Demo Store — Hand-coded Next.js</title>
        <meta name="description" content="A small demo store built with Next.js using plain HTML, CSS, and JS — SSR example using fakestoreapi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
      </Head>

      <header className="site-header">
        <h1 className="site-title">Appsscrip Demo Store</h1>
        <p className="lead">Server-side rendered product listing, responsive, and SEO friendly.</p>
      </header>

      <main>
        <h2 className="visually-hidden">Products</h2>
        <PLPHeader itemsCount={products.length} onToggleFilters={() => setFiltersVisible((v) => !v)} filtersVisible={filtersVisible} onSort={(s)=> setFilter((prev)=> ({...prev, sort: s}))} />

        <div className={`plp ${filtersVisible ? '' : 'filter-hidden'}`}>
          <FilterSidebar products={products} onFilter={(f) => setFilter(f)} onClose={() => setFiltersVisible(false)} isOverlay={isMobile && filtersVisible} />
          <section className="grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </section>
          <FloatingAvatars />
          {/* Render a backdrop for overlay when using mobile overlay */}
          {isMobile && filtersVisible && <div className="filter-backdrop" onClick={() => setFiltersVisible(false)} aria-hidden />} 
        </div>
      </main>

      <footer className="site-footer">
        <small>© {new Date().getFullYear()} Appsscrip Demo</small>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  // Server-side rendering for fresh content (SSR)
  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=8');
    const products = await res.json();

    return { props: { products } };
  } catch (err) {
    console.error('SSR fetch failed', err);
    return { props: { products: [] } };
  }
}
