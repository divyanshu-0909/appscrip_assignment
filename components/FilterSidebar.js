import { useState, useEffect } from 'react';

export default function FilterSidebar({ products, onFilter, onClose, isOverlay }) {
  const [categories, setCategories] = useState([]);
  const [customizableOnly, setCustomizableOnly] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sort, setSort] = useState('');
  const [groupSelections, setGroupSelections] = useState({});

  useEffect(() => {
    const cats = Array.from(new Set(products.map((p) => p.category))).sort();
    setCategories(cats);
    const prices = products.map(p => p.price);
    setMinPrice(Math.floor(Math.min(...prices)));
    setMaxPrice(Math.ceil(Math.max(...prices)));
  }, [products]);

  useEffect(() => {
    const filter = {
      categories: selectedCategories,
      search,
      minPrice,
      maxPrice,
      sort,
      groups: groupSelections,
    };
    onFilter(filter);
  }, [selectedCategories, search, minPrice, maxPrice, sort, groupSelections]);

  function toggleCategory(cat) {
    setSelectedCategories((prev) => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  }

  function toggleCustomizable() {
    setCustomizableOnly((v) => !v);
    // if customizing is a filter in mind, we can add to groupSelections too
    setGroupSelections(prev => ({ ...prev, customizable: customizableOnly ? [] : ['customizable'] }));
  }

  function toggleGroupOption(groupKey, value) {
    setGroupSelections(prev => {
      const cur = prev[groupKey] || [];
      const exists = cur.includes(value);
      const next = exists ? cur.filter(v => v !== value) : [...cur, value];
      return { ...prev, [groupKey]: next };
    });
  }

  function clearGroup(groupKey) {
    setGroupSelections(prev => ({ ...prev, [groupKey]: [] }));
  }

  // Define groups and options for sidebar (can be extended or provided via props)
  const groups = [
    { key: 'idealFor', title: 'IDEAL FOR', options: ['Men', 'Women', 'Baby & Kids'] },
    { key: 'occasion', title: 'OCCASION', options: ['Work', 'Casual', 'Formal'] },
    { key: 'fabric', title: 'FABRIC', options: ['Cotton', 'Leather', 'Wool'] },
    { key: 'segment', title: 'SEGMENT', options: ['Premium', 'Essentials'] },
    { key: 'suitableFor', title: 'SUITABLE FOR', options: ['All', 'Outdoors', 'Indoor'] },
    { key: 'rawMaterials', title: 'RAW MATERIALS', options: ['Plastic', 'Metal', 'Fabric'] },
    { key: 'pattern', title: 'PATTERN', options: ['Checked', 'Striped', 'Plain'] },
  ];

  return (
    <aside className={`filter-sidebar ${isOverlay ? 'is-overlay' : ''}`} aria-hidden={!isOverlay && false}>
      {isOverlay && (
        <div className="drawer-header">
          <button className="drawer-close" onClick={() => onClose && onClose()} aria-label="Close filters">✕</button>
        </div>
      )}
      <div className="filter-section">
        <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:6}}>
          <input id="customizable" name="customizable" type='checkbox' checked={customizableOnly} onChange={toggleCustomizable} />
          <label htmlFor="customizable">CUSTOMIZABLE</label>
        </div>
        <label htmlFor="search" className="filter-label">Search</label>
        <input id="search" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products" />
      </div>

      <div className="filter-section">
        <h4>Categories</h4>
        <div className="unselect-all"> <button className="linkish" onClick={() => setSelectedCategories([])}>Unselect all</button></div>
        <ul className="cat-list" aria-label="Categories">
          {categories.map((c) => (
            <li key={c}><label><input type="checkbox" checked={selectedCategories.includes(c)} onChange={() => toggleCategory(c)} /> {c}</label></li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h4>Price range</h4>
        <div className="price-row">
          <input aria-label="Minimum price" type="number" min="0" step="1" value={minPrice} onChange={e => setMinPrice(Number(e.target.value))} />
          <span>—</span>
          <input aria-label="Maximum price" type="number" min="0" step="1" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} />
        </div>
      </div>

      <div className="filter-section filter-groups">
        {groups.map((g) => (
          <details key={g.key} open={!isOverlay} className="filter-group">
            <summary>{g.title}</summary>
            <div className="group-section">
              {g.key === 'idealFor' && (
                <div className="unselect-all"><button className="linkish" onClick={() => clearGroup(g.key)}>Unselect all</button></div>
              )}
              <ul className="cat-list" aria-label={g.title}>
                {g.options.map(option => (
                  <li key={option}><label><input type="checkbox" checked={(groupSelections[g.key] || []).includes(option)} onChange={() => toggleGroupOption(g.key, option)} /> {option}</label></li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>

      <div className="filter-section">
        <button type="button" onClick={() => { setSelectedCategories([]); setSearch(''); const prices = products.map(p => p.price); setMinPrice(Math.floor(Math.min(...prices))); setMaxPrice(Math.ceil(Math.max(...prices))); setSort(''); }} className="clear-btn">Clear filters</button>
      </div>
    </aside>
  );
}
