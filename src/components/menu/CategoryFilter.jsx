import { CATEGORIES } from '../../constants';

// Category mapping helper for translations
const getCategoryName = (cat, langCode) => {
  if (langCode === 'en') return cat;

  const mapping = {
    All: 'الكل',
    Burgers: 'برجر',
    Pizza: 'بيتزا',
    Pasta: 'مكرونة',
    Salads: 'سلطات',
    Drinks: 'مشروبات',
    Desserts: 'حلويات',
  };
  return mapping[cat] || cat;
};

// Category icon mapping helper
const getCategoryIcon = (cat) => {
  const icons = {
    All: '🍽️',
    Burgers: '🍔',
    Pizza: '🍕',
    Pasta: '🍝',
    Salads: '🥗',
    Drinks: '🥤',
    Desserts: '🍰',
  };
  return icons[cat] || '🍽️';
};

function CategoryFilter({ activeCategory, setActiveCategory, lang }) {
  return (
    <div className="w-full overflow-x-auto pb-3" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="flex items-center gap-2 w-max min-w-full">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const icon = getCategoryIcon(cat);
          const name = getCategoryName(cat, lang.code);

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap active:scale-95 border ${
                isActive
                  ? 'text-white border-transparent shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900'
              }`}
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, #E8572A 0%, #ff7a45 100%)'
                  : undefined,
              }}
            >
              <span className="text-base">{icon}</span>
              <span>{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryFilter;
export { getCategoryName };
