import { useState, useEffect } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { formatCurrency } from '../utils/helpers';
import { DELIVERY_FEE } from '../constants';

const DEFAULT_FORM = {
  phone: '',
  address: '',
  instructions: '',
};

const DEFAULT_CARD = {
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
};

/* ── Card field formatters ─────────────────────────── */
const formatCardNumber = (val) =>
  val
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();

const formatExpiry = (val) => {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
};

/* ── Card type detector ─────────────────────────────── */
const detectCardType = (num) => {
  const n = num.replace(/\s/g, '');
  if (/^4/.test(n)) return { label: 'Visa', emoji: '💳' };
  if (/^5[1-5]/.test(n)) return { label: 'Mastercard', emoji: '💳' };
  if (/^6/.test(n)) return { label: 'Meeza', emoji: '💳' };
  return null;
};

function CheckoutPage({ lang, currentUser, setPage, cart, subtotal, clearCart, onPlaceOrder }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'card'
  const [card, setCard] = useState(DEFAULT_CARD);
  const [errors, setErrors] = useState({});
  const [isOrdered, setIsOrdered] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');
  const isAr = lang.code === 'ar';

  useEffect(() => {
    // If cart is empty and order wasn't just placed, go back to menu
    if (cart.length === 0 && !isOrdered) {
      setPage('menu');
    }
  }, [cart, isOrdered, setPage]);

  // Admin cannot place orders
  if (currentUser?.role === 'admin') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 flex flex-col items-center animate-scale-up">
          <span className="text-5xl mb-4">🛡️</span>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {isAr ? 'المشرفون لا يمكنهم تقديم طلبات' : 'Admins Cannot Place Orders'}
          </h2>
          <p className="text-sm text-gray-500 font-medium mb-6">
            {isAr
              ? 'حساب المشرف مخصص لإدارة المنتجات والطلبات فقط. استخدم حساب مستخدم عادي للطلب.'
              : 'Admin accounts are for managing products & orders only. Use a regular user account to place an order.'}
          </p>
          <div className="flex flex-col gap-2 w-full">
            <Button onClick={() => setPage('admin')} variant="primary" className="w-full font-bold">
              {isAr ? 'الذهاب للوحة التحكم' : 'Go to Admin Dashboard'}
            </Button>
            <Button onClick={() => setPage('menu')} variant="secondary" className="w-full font-bold">
              {isAr ? 'العودة للقائمة' : 'Back to Menu'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If user is not logged in, prompt to login
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 flex flex-col items-center">
          <span className="text-5xl mb-4 animate-bounce-subtle">🔒</span>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {isAr ? 'عذراً! يجب تسجيل الدخول أولاً' : 'Login Required'}
          </h2>
          <p className="text-sm text-gray-500 font-medium mb-6">
            {isAr
              ? 'يرجى تسجيل الدخول أو إنشاء حساب لإتمام عملية الشراء وتتبع طلبك.'
              : 'Please login or register to complete your order and track its status.'}
          </p>
          <div className="flex flex-col gap-2 w-full">
            <Button onClick={() => setPage('login')} variant="primary" className="w-full font-bold">
              {lang.login}
            </Button>
            <Button onClick={() => setPage('menu')} variant="secondary" className="w-full font-bold">
              {isAr ? 'العودة للتسوق' : 'Back to Shopping'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Success view
  if (isOrdered) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-[#E8572A]/10 shadow-2xl p-8 flex flex-col items-center animate-scale-up">
          <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-3xl mb-4 border border-green-100 shadow-inner">
            ✓
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-1">
            {lang.orderSuccess}
          </h2>
          <p className="text-xs text-gray-500 font-bold mb-6">
            {isAr ? 'طلبك قيد التحضير الآن وسوف يصلك قريباً.' : 'Your order has been sent to our kitchen and is cooking!'}
          </p>

          <div className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-xs font-bold text-gray-500">
              <span>{lang.orderNum}</span>
              <span className="text-gray-900 font-mono">#{createdOrderId}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-500">
              <span>{lang.customer}</span>
              <span className="text-gray-900">{currentUser.name}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-500">
              <span>{lang.total}</span>
              <span className="text-[#E8572A] font-black">{formatCurrency(subtotal + DELIVERY_FEE, lang.code)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Button onClick={() => setPage('orders')} variant="primary" className="w-full font-bold">
              {lang.trackOrder}
            </Button>
            <Button onClick={() => setPage('menu')} variant="secondary" className="w-full font-bold">
              {lang.backToMenu}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleCardChange = (field, rawVal) => {
    let val = rawVal;
    if (field === 'cardNumber') val = formatCardNumber(rawVal);
    if (field === 'expiry') val = formatExpiry(rawVal);
    if (field === 'cvv') val = rawVal.replace(/\D/g, '').slice(0, 4);
    setCard((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validateForm = () => {
    const errs = {};

    // Delivery fields
    if (!form.phone.trim()) {
      errs.phone = lang.requiredField;
    } else if (!/^\+?[0-9]{8,15}$/.test(form.phone.replace(/\s/g, ''))) {
      errs.phone = isAr ? 'رقم الهاتف غير صحيح' : 'Invalid phone number format';
    }

    if (!form.address.trim()) {
      errs.address = lang.requiredField;
    } else if (form.address.trim().length < 8) {
      errs.address = isAr ? 'العنوان يجب أن يكون تفصيلياً' : 'Address must be detailed (at least 8 chars)';
    }

    // Card fields (only when card payment is selected)
    if (paymentMethod === 'card') {
      if (!card.cardName.trim()) {
        errs.cardName = lang.requiredField;
      } else if (card.cardName.trim().length < 3) {
        errs.cardName = isAr ? 'أدخل الاسم كما هو على البطاقة' : 'Enter name as it appears on card';
      }

      const rawNum = card.cardNumber.replace(/\s/g, '');
      if (!rawNum) {
        errs.cardNumber = lang.requiredField;
      } else if (rawNum.length !== 16) {
        errs.cardNumber = isAr ? 'رقم البطاقة يجب أن يكون ١٦ رقماً' : 'Card number must be 16 digits';
      }

      if (!card.expiry) {
        errs.expiry = lang.requiredField;
      } else {
        const [mm, yy] = card.expiry.split('/');
        const month = parseInt(mm, 10);
        const year = 2000 + parseInt(yy || '0', 10);
        const now = new Date();
        if (!mm || !yy || yy.length !== 2 || month < 1 || month > 12) {
          errs.expiry = isAr ? 'صيغة التاريخ غير صحيحة (MM/YY)' : 'Invalid format (MM/YY)';
        } else if (
          year < now.getFullYear() ||
          (year === now.getFullYear() && month < now.getMonth() + 1)
        ) {
          errs.expiry = isAr ? 'البطاقة منتهية الصلاحية' : 'Card is expired';
        }
      }

      if (!card.cvv) {
        errs.cvv = lang.requiredField;
      } else if (card.cvv.length < 3) {
        errs.cvv = isAr ? 'CVV غير صحيح' : 'Invalid CVV (3-4 digits)';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderId = onPlaceOrder({
      cart,
      subtotal,
      form,
      paymentMethod,
      userId: currentUser.id,
      customerName: currentUser.name,
    });

    setCreatedOrderId(orderId);
    setIsOrdered(true);
    clearCart();
  };

  const total = subtotal + DELIVERY_FEE;
  const cardType = detectCardType(card.cardNumber);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-black text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
        {lang.checkout}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">

          {/* Delivery & Contact */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h3 className="font-extrabold text-sm text-gray-800 border-b border-gray-50 pb-3">
              {isAr ? 'بيانات التوصيل' : 'Delivery & Contact Details'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label={lang.name} value={currentUser.name} disabled />
              <Input
                label={lang.phone}
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                error={errors.phone}
                placeholder="e.g. 01012345678"
                required
              />
            </div>

            <Input
              label={lang.address}
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              error={errors.address}
              placeholder="e.g. Flat 12, Floor 3, Building 45, El-Nasr St, Cairo"
              required
            />

            <Input
              label={lang.specialInstructions}
              type="textarea"
              value={form.instructions}
              onChange={(e) => handleChange('instructions', e.target.value)}
              rows={2}
              placeholder={isAr ? 'مثال: بدون طماطم، رن الجرس وسيب الأكل عالباب...' : 'e.g. Extra spicy, leave at the door...'}
            />
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h3 className="font-extrabold text-sm text-gray-800 border-b border-gray-50 pb-3">
              {lang.paymentMethod}
            </h3>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-4">
              {/* Cash On Delivery */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#E8572A] bg-orange-50/20 shadow-inner'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-xl">💵</span>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 mt-2">{lang.cashOnDelivery}</h4>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                    {isAr ? 'الدفع نقداً عند باب البيت' : 'Pay when you receive the order'}
                  </p>
                </div>
              </button>

              {/* Online payment */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#E8572A] bg-orange-50/20 shadow-inner'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-xl">💳</span>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 mt-2">{lang.payOnline}</h4>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                    {isAr ? 'فيزا، ماستركارد، كارت ميزة' : 'Credit / Debit Card / Meeza'}
                  </p>
                </div>
              </button>
            </div>

            {/* ── Card Fields (only when card selected) ─────────── */}
            {paymentMethod === 'card' && (
              <div className="mt-2 space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-100 rounded-2xl">
                  <span className="text-base">🔒</span>
                  <p className="text-[11px] font-bold text-blue-600">
                    {isAr
                      ? 'بياناتك محمية ومشفرة بالكامل (بيئة تجريبية)'
                      : 'Your card details are encrypted & secure (demo environment)'}
                  </p>
                </div>

                {/* Cardholder name */}
                <Input
                  label={isAr ? 'اسم حامل البطاقة' : 'Cardholder Name'}
                  value={card.cardName}
                  onChange={(e) => handleCardChange('cardName', e.target.value)}
                  error={errors.cardName}
                  placeholder={isAr ? 'كما هو مكتوب على البطاقة' : 'As it appears on the card'}
                  required
                />

                {/* Card number */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700">
                    {isAr ? 'رقم البطاقة' : 'Card Number'}
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={card.cardNumber}
                      onChange={(e) => handleCardChange('cardNumber', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all font-mono tracking-widest pr-20 ${
                        errors.cardNumber ? 'border-red-400' : 'border-gray-200'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {cardType ? (
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg">
                          {cardType.emoji} {cardType.label}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-300 font-bold">•••• ••••</span>
                      )}
                    </div>
                  </div>
                  {errors.cardNumber && (
                    <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>
                  )}
                </div>

                {/* Expiry + CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      {isAr ? 'تاريخ الانتهاء' : 'Expiry Date'}
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={card.expiry}
                      onChange={(e) => handleCardChange('expiry', e.target.value)}
                      placeholder="MM/YY"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all font-mono ${
                        errors.expiry ? 'border-red-400' : 'border-gray-200'
                      }`}
                    />
                    {errors.expiry && (
                      <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      CVV
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        inputMode="numeric"
                        value={card.cvv}
                        onChange={(e) => handleCardChange('cvv', e.target.value)}
                        placeholder="•••"
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all ${
                          errors.cvv ? 'border-red-400' : 'border-gray-200'
                        }`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs">❓</span>
                    </div>
                    {errors.cvv && (
                      <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                {/* Accepted card logos row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    {isAr ? 'نقبل:' : 'We accept:'}
                  </span>
                  {['Visa', 'Mastercard', 'Meeza'].map((brand) => (
                    <span
                      key={brand}
                      className="text-[10px] font-black text-gray-600 bg-gray-100 px-2 py-0.5 rounded-lg border border-gray-200"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Order Summary Sidebar */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <h3 className="font-extrabold text-sm text-gray-800 border-b border-gray-50 pb-3 mb-4">
            {lang.orderSummary}
          </h3>

          {/* Cart Item rows */}
          <div className="divide-y divide-gray-50 overflow-y-auto max-h-[220px] pr-2 -mr-2">
            {cart.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between text-xs font-bold text-gray-600">
                <div className="truncate pr-3 max-w-[160px]">
                  <span className="text-[#E8572A]">{item.qty}x</span>{' '}
                  <span className="text-gray-800">{isAr ? item.nameAr : item.nameEn}</span>
                </div>
                <span className="text-gray-900 font-black flex-shrink-0">
                  {formatCurrency(item.price * item.qty, lang.code)}
                </span>
              </div>
            ))}
          </div>

          {/* Money Breakdown */}
          <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
            <div className="flex justify-between text-xs font-bold text-gray-500">
              <span>{lang.subtotal}</span>
              <span className="text-gray-800">{formatCurrency(subtotal, lang.code)}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-500">
              <span>{lang.deliveryFee}</span>
              <span className="text-gray-800">{formatCurrency(DELIVERY_FEE, lang.code)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-gray-900 border-t border-gray-150 pt-3 mt-1">
              <span>{lang.total}</span>
              <span className="text-[#E8572A]">{formatCurrency(total, lang.code)}</span>
            </div>
          </div>

          {/* Payment method badge */}
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-base">{paymentMethod === 'card' ? '💳' : '💵'}</span>
            <span className="text-[11px] font-bold text-gray-500">
              {paymentMethod === 'card' ? lang.payOnline : lang.cashOnDelivery}
            </span>
          </div>

          <Button
            onClick={handleSubmit}
            variant="primary"
            className="w-full py-3.5 mt-6 font-bold text-sm tracking-wide shadow-lg"
          >
            {lang.placeOrder}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
