import ProductCard from './ProductCard';

function ProductGrid({ products, lang, onAddToCart, isAdmin }) {
  const isAr = lang.code === 'ar';

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm mt-4">
        <span className="text-5xl mb-4 animate-bounce-subtle">🔍</span>
        <h3 className="text-lg font-bold text-gray-800 mb-1">
          {isAr ? 'لم نجد أي أطباق تطابق بحثك!' : 'No dishes match your search!'}
        </h3>
        <p className="text-sm text-gray-500 max-w-xs font-medium">
          {isAr
            ? 'يرجى تجربة كلمة بحث أخرى أو تغيير تصفية الفئة.'
            : 'Try checking your spelling or choosing another category filters.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          lang={lang}
          onAddToCart={onAddToCart}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
