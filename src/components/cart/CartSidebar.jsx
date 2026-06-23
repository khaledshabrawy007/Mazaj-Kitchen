import { XIcon, TrashIcon } from '../ui/Icons';
import CartItem from './CartItem';
import Button from '../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { DELIVERY_FEE } from '../../constants';

function CartSidebar({
  isOpen,
  onClose,
  cart,
  subtotal,
  itemCount,
  onUpdateQty,
  onRemove,
  onClear,
  setPage,
  lang,
}) {
  if (!isOpen) return null;

  const isAr = lang.code === 'ar';
  const total = subtotal > 0 ? subtotal + DELIVERY_FEE : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-[#2A2A2A]/40 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        ></div>

        {/* Drawer Wrapper */}
        <div className={`fixed inset-y-0 max-w-full flex ${isAr ? 'left-0' : 'right-0'}`}>
          <div
            className={`w-screen max-w-md bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-300 ${
              isAr ? 'animate-slide-in-left' : 'animate-slide-in-right'
            }`}
          >
            {/* Header */}
            <div className="px-4 py-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between sm:px-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛒</span>
                <h2 className="text-lg font-bold text-gray-900" id="slide-over-title">
                  {lang.cart} ({itemCount})
                </h2>
              </div>
              <div className="flex items-center gap-3">
                {itemCount > 0 && (
                  <button
                    onClick={onClear}
                    className="text-xs text-gray-500 hover:text-red-600 transition flex items-center gap-1 font-semibold"
                    title={lang.emptyCart}
                  >
                    <TrashIcon size={12} />
                    <span>{isAr ? 'مسح' : 'Clear'}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
                >
                  <XIcon size={20} />
                </button>
              </div>
            </div>

            {/* Content / Scrollable Items */}
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <span className="text-5xl mb-4 animate-bounce-subtle">🍳</span>
                  <h3 className="text-base font-bold text-gray-800 mb-1">{lang.emptyCart}</h3>
                  <p className="text-xs text-gray-500 max-w-[200px]">{isAr ? 'أضف بعض الأكلات اللذيذة من القائمة!' : 'Add some delicious meals from the menu!'}</p>
                </div>
              ) : (
                <div className="flow-root">
                  <div className="-my-6 divide-y divide-gray-100">
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        lang={lang}
                        onUpdateQty={onUpdateQty}
                        onRemove={onRemove}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 px-4 py-6 bg-gray-50 sm:px-6">
                <div className="space-y-2.5 mb-6">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{lang.subtotal}</span>
                    <span className="font-semibold">{formatCurrency(subtotal, lang.code)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{lang.deliveryFee}</span>
                    <span className="font-semibold">{formatCurrency(DELIVERY_FEE, lang.code)}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-gray-900 border-t border-gray-200 pt-2.5">
                    <span>{lang.total}</span>
                    <span style={{ color: '#E8572A' }}>{formatCurrency(total, lang.code)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      setPage('checkout');
                      onClose();
                    }}
                    variant="primary"
                    className="w-full py-3 font-bold text-sm tracking-wide shadow-md"
                  >
                    {lang.checkout}
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    className="w-full py-2.5 text-xs font-semibold text-gray-500 hover:text-gray-800"
                  >
                    {isAr ? 'استكمال التسوق' : 'Continue Shopping'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSidebar;
