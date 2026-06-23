import { CartIcon } from '../ui/Icons';
import { formatCurrency } from '../../utils/helpers';

function FloatingCartButton({ itemCount, subtotal, onCartOpen, lang }) {
  if (itemCount === 0) return null;

  return (
    <button
      onClick={onCartOpen}
      className={`fixed bottom-6 z-40 flex items-center gap-3 px-5 py-4.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group text-white animate-bounce-subtle ${
        lang.code === 'ar' ? 'left-6' : 'right-6'
      }`}
      style={{
        background: 'linear-gradient(135deg, #E8572A 0%, #ff7a45 100%)',
        boxShadow: '0 10px 25px -5px rgba(232, 87, 42, 0.4)',
      }}
      aria-label={lang.cart}
    >
      <div className="relative">
        <CartIcon size={24} />
        <span
          className="absolute -top-3.5 -right-3.5 w-6 h-6 rounded-full text-xs font-black flex items-center justify-center border-2 border-white animate-pulse"
          style={{ background: '#F4C430', color: '#2A2A2A' }}
        >
          {itemCount}
        </span>
      </div>
      <div className="flex flex-col items-start leading-none text-left">
        <span className="text-[10px] text-orange-100 uppercase tracking-wider font-bold">
          {lang.cart}
        </span>
        <span className="text-sm font-extrabold mt-0.5">
          {formatCurrency(subtotal, lang.code)}
        </span>
      </div>
    </button>
  );
}

export default FloatingCartButton;
