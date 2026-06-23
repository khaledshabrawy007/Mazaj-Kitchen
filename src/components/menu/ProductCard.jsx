import Stars from '../ui/Stars';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../utils/helpers';

function ProductCard({ product, lang, onAddToCart, isAdmin }) {
  const isAr = lang.code === 'ar';
  const name = isAr ? product.nameAr : product.nameEn;
  const desc = isAr ? product.descAr : product.descEn;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Product Image & Badge Overlay */}
      <div className="relative pt-[70%] bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Availability Badge */}
        <div className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'}`}>
          {product.available ? (
            <Badge variant="orange" className="font-bold text-[10px]">
              {lang.available}
            </Badge>
          ) : (
            <Badge variant="danger" className="font-bold text-[10px]">
              {lang.unavailable}
            </Badge>
          )}
        </div>
        {/* Category Badge overlay */}
        <div className={`absolute bottom-3 ${isAr ? 'right-4' : 'left-4'}`}>
          <span className="text-[10px] bg-black/60 backdrop-blur-md text-white font-extrabold px-2.5 py-1 rounded-lg">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Name and Rating */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-extrabold text-gray-800 text-base leading-snug group-hover:text-[#E8572A] transition duration-200">
            {name}
          </h3>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={product.rating} size={14} />
          <span className="text-[11px] text-gray-500 font-bold mt-0.5">
            {product.rating} ({product.reviews} {lang.reviews})
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-1">
          {desc}
        </p>

        {/* Price & Add to Cart button */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-50 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">
              {lang.price}
            </span>
            <span className="text-base font-black text-gray-950 mt-1">
              {formatCurrency(product.price, lang.code)}
            </span>
          </div>

          {isAdmin ? (
            <span className="text-[10px] font-black text-gray-400 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-xl tracking-wide uppercase">
              👁 Admin View
            </span>
          ) : (
            <Button
              onClick={() => onAddToCart(product)}
              variant={product.available ? 'primary' : 'secondary'}
              disabled={!product.available}
              className="px-4 py-2 text-xs font-bold shadow-sm"
            >
              {product.available ? lang.addToCart : lang.unavailable}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
