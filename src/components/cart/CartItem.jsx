import { TrashIcon, PlusIcon, MinusIcon } from '../ui/Icons';
import { formatCurrency } from '../../utils/helpers';

function CartItem({ item, lang, onUpdateQty, onRemove }) {
  const isAr = lang.code === 'ar';
  const name = isAr ? item.nameAr : item.nameEn;

  return (
    <div className="flex items-center gap-3 py-4 border-b border-gray-100 last:border-b-0">
      {/* Product Image */}
      <img
        src={item.image}
        alt={name}
        className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-orange-50 border border-gray-100"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-gray-800 truncate">{name}</h4>
        <p className="text-xs text-gray-500 mt-0.5">
          {formatCurrency(item.price, lang.code)}
        </p>
        <span className="text-[10px] bg-orange-50 text-[#E8572A] px-2 py-0.5 rounded-full font-semibold inline-block mt-1">
          {isAr ? item.categoryAr || item.category : item.categoryEn || item.category}
        </span>
      </div>

      {/* Quantity & Actions */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => onUpdateQty(item.id, -1)}
            className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-800 transition active:scale-90"
            aria-label="Decrease quantity"
          >
            <MinusIcon size={12} />
          </button>
          <span className="w-6 text-center font-bold text-xs text-gray-800">
            {item.qty}
          </span>
          <button
            onClick={() => onUpdateQty(item.id, 1)}
            className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-800 transition active:scale-90"
            aria-label="Increase quantity"
          >
            <PlusIcon size={12} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-gray-800">
            {formatCurrency(item.price * item.qty, lang.code)}
          </span>
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-red-600 transition p-1"
            title={lang.removeItem}
          >
            <TrashIcon size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
