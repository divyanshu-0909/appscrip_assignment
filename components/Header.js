import { useFilterContext } from '../context/FilterContext';

export default function Header() {
  const { isMobile, filtersVisible, setFiltersVisible } = useFilterContext();
  return (
    <header className="site-header-global">
      <div className="header-top">
        <div className="brand-left"> 
          <div className="brand-emblem" aria-hidden>✦</div>
        </div>

        <div className="brand-center">
          <div className="brand-logo">LOGO</div>
        </div>

        <div className="brand-right">
          {/* Hamburger visible on mobile/tablet to toggle the filter drawer */}
          {isMobile && (
            <button className="hamburger" aria-label="Show filters" onClick={() => setFiltersVisible((v) => !v)}>
              ☰
            </button>
          )}
          <button className="icon-btn" aria-label="Search">🔍</button>
          <button className="icon-btn" aria-label="Favorites">♡</button>
          <button className="icon-btn" aria-label="Bag">👜</button>
          <button className="icon-btn" aria-label="Account">👤</button>
          <div className="lang">EN ▾</div>
        </div>
      </div>

      <nav className="header-nav">
        <ul>
          <li><a href="#">SHOP</a></li>
          <li><a href="#">SKILLS</a></li>
          <li><a href="#">STORIES</a></li>
          <li><a href="#">ABOUT</a></li>
          <li><a href="#">CONTACT US</a></li>
        </ul>
      </nav>
    </header>
  );
}
