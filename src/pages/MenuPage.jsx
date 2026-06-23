import { useState, useTransition } from 'react';
import HeroBanner from '../components/menu/HeroBanner';
import CategoryFilter from '../components/menu/CategoryFilter';
import SearchBar from '../components/menu/SearchBar';
import ProductGrid from '../components/menu/ProductGrid';

function MenuPage({ lang, products, onAddToCart, isAdmin }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchVal, setSearchVal] = useState('');
  const [, startTransition] = useTransition();

  // Search logic and Category Filter
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = activeCategory === 'All' || prod.category === activeCategory;
    const matchesSearch =
      prod.nameEn.toLowerCase().includes(searchVal.toLowerCase()) ||
      prod.nameAr.includes(searchVal) ||
      prod.descEn.toLowerCase().includes(searchVal.toLowerCase()) ||
      prod.descAr.includes(searchVal);

    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (cat) => {
    startTransition(() => {
      setActiveCategory(cat);
    });
  };

  const handleSearchChange = (val) => {
    startTransition(() => {
      setSearchVal(val);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Visual Hero Banner */}
      <HeroBanner lang={lang} />

      {/* Filter and Search Bar Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
          lang={lang}
        />
        <SearchBar
          searchVal={searchVal}
          setSearchVal={handleSearchChange}
          lang={lang}
        />
      </div>

      {/* Products Grid list */}
      <ProductGrid
        products={filteredProducts}
        lang={lang}
        onAddToCart={onAddToCart}
        isAdmin={isAdmin}
      />
    </div>
  );
}

export default MenuPage;
