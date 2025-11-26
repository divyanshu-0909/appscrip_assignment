import { useState } from 'react';

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const isOutOfStock = product.id % 7 === 0; // demo condition
  const isRecommended = product.id % 5 === 0; // demo condition
  const shortTitle = product.title.length > 36 ? product.title.substring(0, 34) + '…' : product.title;

  return (
    <article className="card stacked" aria-label={`Product ${product.title}`}> 
      <a href={`/product/${product.id}`} className="card-link column" aria-label={`View ${product.title}`}> 
        <figure className="card-media" aria-hidden>
          {isOutOfStock && <div className="badge">OUT OF STOCK</div>}
          {isRecommended && <div className="badge recommended">RECOMMENDED</div>}
          <div className="overlay-actions">
            <button className="action-btn" aria-label="Add to Wishlist" onClick={(e) => { e.preventDefault(); setLiked((v)=>!v); }}>
              {liked ? '♥' : '♡'}
            </button>
            <button className="action-btn" aria-label="Quick view">🔍</button>
          </div>
          <img
            src={(product.images && product.images[0]) || product.image}
            alt={product.title}
            width="320"
            height="320"
            loading="lazy"
            onError={(e) => { e.target.onerror = null; e.target.src = '/images/product-sample-1.jpg'; }}
          />
        </figure>
        <div className="card-body column">
          <h3 className="product-title">{shortTitle}</h3>
          <p className="product-price">${product.price}</p>
          <p className="product-desc">{(product.shortDescription || product.description || '').substring(0, 80)}{((product.shortDescription || product.description || '').length > 80) ? '...' : ''}</p>
          <div className="product-footer-note">Sign in or Create an account to see pricing</div>
        </div>
      </a>
    </article>
  );
}
