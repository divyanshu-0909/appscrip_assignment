import React, { createContext, useContext, useEffect, useState } from 'react';

const FilterContext = createContext();

export function useFilterContext() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }) {
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function onResize() {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (mobile) setFiltersVisible(false);
      else setFiltersVisible(true);
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <FilterContext.Provider value={{ filtersVisible, setFiltersVisible, isMobile }}>
      {children}
    </FilterContext.Provider>
  );
}
