import React, { useState } from 'react';

export default function PLPHeader({ itemsCount, onToggleFilters, filtersVisible, onSort }) {
  const openSort = (value) => onSort(value);
  const [open, setOpen] = useState(false);
  return (
    <div className="plp-header">
      <div className="plp-header-left">
        <div className="items-count">{itemsCount} ITEMS</div>
        <button className="show-filters" onClick={onToggleFilters} aria-expanded={filtersVisible}>{filtersVisible ? 'HIDE FILTERS' : 'SHOW FILTERS'}</button>
      </div>

      <div className="plp-header-right">
        <div className="recommended-popover">
          <button className="recommended-button" onClick={() => setOpen((v)=>!v)} aria-expanded={open} aria-controls="recommendations-menu">RECOMMENDED ▾</button>
          {open && (
            <div id="recommendations-menu" className="recommendations-menu" role="menu">
              <button onClick={() => openSort('')}>Recommended</button>
              <button onClick={() => openSort('popular')}>Most Popular</button>
              <button onClick={() => openSort('newest')}>Newest</button>
              <button onClick={() => openSort('price-asc')}>Price: Low to High</button>
              <button onClick={() => openSort('price-desc')}>Price: High to Low</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
