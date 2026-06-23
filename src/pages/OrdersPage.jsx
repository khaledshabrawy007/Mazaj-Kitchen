import { useState } from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { formatCurrency, formatDate } from '../utils/helpers';
import { getStatusBadgeVariant, getStatusLabel } from '../components/admin/OrdersTable';
import { STATUS_STEPS } from '../constants';

const STEP_ICONS = {
  placed: '📝',
  preparing: '🍳',
  onway: '🛵',
  delivered: '🎁',
};

const getStepDescription = (step, lang) => {
  const isAr = lang.code === 'ar';
  switch (step) {
    case 'placed':
      return isAr ? 'استلمنا طلبك وجاري مراجعته' : 'Order received & being confirmed';
    case 'preparing':
      return isAr ? 'الشيف يحضر طعامك الساخن بكل حب' : 'Our chef is preparing your meal';
    case 'onway':
      return isAr ? 'الطيار في الطريق إليك الآن' : 'Delivery pilot is speeding to you';
    case 'delivered':
      return isAr ? 'بالهنا والشفا! تم التوصيل' : 'Bon appétit! Order delivered';
    default:
      return '';
  }
};

function OrdersPage({ lang, currentUser, orders, setPage }) {
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id || null);
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'tracker'
  const isAr = lang.code === 'ar';

  const userOrders = orders; // Assume filtered by parent to keep hooks inside container (SOLID-D)
  const activeOrder = userOrders.find((o) => o.id === selectedOrderId) || userOrders[0];

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 flex flex-col items-center">
          <span className="text-5xl mb-4 animate-bounce-subtle">🔒</span>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {isAr ? 'يجب تسجيل الدخول لمتابعة طلباتك' : 'Login Required'}
          </h2>
          <p className="text-sm text-gray-500 font-medium mb-6">
            {isAr ? 'يرجى تسجيل الدخول لعرض قائمة طلباتك وحالات التتبع النشطة.' : 'Please login to view your order history and active trackers.'}
          </p>
          <Button onClick={() => setPage('login')} variant="primary" className="w-full font-bold">
            {lang.login}
          </Button>
        </div>
      </div>
    );
  }

  if (userOrders.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 flex flex-col items-center">
          <span className="text-5xl mb-4 animate-bounce-subtle">🛍️</span>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{lang.noOrders}</h2>
          <p className="text-sm text-gray-500 font-medium mb-6">
            {isAr ? 'لم تطلب أي مأكولات بعد. ألقِ نظرة على المنيو اللذيذ!' : 'You haven\'t ordered anything yet. Browse our delicious menu!'}
          </p>
          <Button onClick={() => setPage('menu')} variant="primary" className="w-full font-bold shadow-md">
            {isAr ? 'عرض المنيو' : 'Browse Menu'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
        {lang.orders}
      </h1>

      {/* Mobile tab toggle */}
      <div className="flex lg:hidden bg-white rounded-2xl border border-gray-100 p-1 mb-5 shadow-sm">
        <button
          onClick={() => setMobileView('list')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            mobileView === 'list' ? 'bg-[#E8572A] text-white shadow' : 'text-gray-500'
          }`}
        >
          {isAr ? '📋 قائمة الطلبات' : '📋 Order List'}
        </button>
        <button
          onClick={() => setMobileView('tracker')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            mobileView === 'tracker' ? 'bg-[#E8572A] text-white shadow' : 'text-gray-500'
          }`}
        >
          {isAr ? '📍 تتبع الطلب' : '📍 Track Order'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Order list — hidden on mobile when tracker tab active */}
        <div className={`lg:col-span-1 space-y-3 ${
          mobileView === 'tracker' ? 'hidden lg:block' : 'block'
        }`}>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            {isAr ? 'تاريخ الطلبات' : 'Order History'}
          </h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {userOrders.map((o) => {
              const isSelected = activeOrder?.id === o.id;
              return (
                <button
                  key={o.id}
                  onClick={() => { setSelectedOrderId(o.id); setMobileView('tracker'); }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-2 ${
                    isSelected
                      ? 'border-[#E8572A] bg-orange-50/10 shadow-sm'
                      : 'bg-white border-gray-100 hover:border-gray-200 shadow-xs'
                  } ${isAr ? 'text-right' : 'text-left'}`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-extrabold text-sm text-gray-900 font-mono">#{o.id}</span>
                    <Badge variant={getStatusBadgeVariant(o.status)} className="font-bold text-[9px]">
                      {getStatusLabel(o.status, lang)}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center w-full text-[10px] text-gray-400 font-bold">
                    <span>{formatDate(o.date)}</span>
                    <span className="text-gray-700 font-black">{formatCurrency(o.total, lang.code)}</span>
                  </div>

                  <div className="text-[11px] text-gray-500 truncate w-full font-medium">
                    {o.items.map((it) => `${it.qty}x ${isAr ? it.nameAr : it.nameEn}`).join(', ')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Tracker — hidden on mobile when list tab active */}
        {activeOrder && (
          <div className={`lg:col-span-2 ${
            mobileView === 'list' ? 'hidden lg:block' : 'block'
          }`}>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
            {/* Header info */}
            <div className="border-b border-gray-50 pb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{lang.orderNum}</span>
                <h4 className="text-lg font-black text-gray-900 font-mono mt-0.5">#{activeOrder.id}</h4>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{lang.total}</span>
                <p className="text-lg font-black text-[#E8572A] mt-0.5">{formatCurrency(activeOrder.total, lang.code)}</p>
              </div>
            </div>

            {/* Stepper tracking map */}
            <div className="py-4">
              <div className="relative">
                {/* Connecting Progress Line */}
                <div
                  className={`absolute top-5 h-0.5 bg-gray-200 z-0 transition-all duration-500 ${
                    isAr ? 'right-6 left-6' : 'left-6 right-6'
                  }`}
                >
                  <div
                    className="h-full transition-all duration-1000 bg-[#E8572A]"
                    style={{
                      width: `${(activeOrder.statusIndex / (STATUS_STEPS.length - 1)) * 100}%`,
                    }}
                  ></div>
                </div>

                {/* Steps Nodes */}
                <div className="flex justify-between items-start relative z-10">
                  {STATUS_STEPS.map((step, idx) => {
                    const isDone = idx <= activeOrder.statusIndex;
                    const isActive = idx === activeOrder.statusIndex;
                    const stepIcon = STEP_ICONS[step];

                    return (
                      <div key={step} className="flex flex-col items-center text-center max-w-[80px]">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-base border-2 transition-all duration-300 ${
                            isActive
                              ? 'border-[#E8572A] bg-orange-100 text-white scale-110 shadow-lg'
                              : isDone
                              ? 'border-[#E8572A] bg-[#E8572A] text-white shadow-sm'
                              : 'border-gray-200 bg-white text-gray-400'
                          }`}
                          style={{
                            background: isActive ? '#E8572A' : undefined,
                          }}
                        >
                          <span>{stepIcon}</span>
                        </div>
                        <span
                          className={`text-[10px] font-black mt-2.5 whitespace-nowrap ${
                            isActive ? 'text-[#E8572A]' : isDone ? 'text-gray-800' : 'text-gray-400'
                          }`}
                        >
                          {getStatusLabel(step, lang)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Simulated Live Cooking Prompt */}
            <div className="bg-orange-50/20 border border-[#E8572A]/10 rounded-2xl p-4 flex gap-3 items-center">
              <span className="text-2xl animate-pulse">⏰</span>
              <div className="flex-1">
                <h5 className="font-extrabold text-xs text-gray-800 uppercase tracking-wide">
                  {isAr ? 'حالة الطلب الحالية' : 'Live Status update'}
                </h5>
                <p className="text-xs text-gray-500 font-semibold mt-0.5">
                  {getStepDescription(activeOrder.status, lang)}
                </p>
              </div>
              {activeOrder.status !== 'delivered' && (
                <span className="text-[10px] bg-orange-100 text-[#E8572A] px-2 py-0.5 rounded-full font-bold animate-pulse">
                  {isAr ? 'تحديث تلقائي مباشر' : 'Live updates'}
                </span>
              )}
            </div>

            {/* Delivery address Summary */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
              <h4 className="font-extrabold text-xs text-gray-800 uppercase tracking-wider border-b border-gray-200 pb-1.5">
                {isAr ? 'معلومات التوصيل والعنوان' : 'Delivery details'}
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs font-bold text-gray-500">
                <div>
                  <span>{lang.name}</span>
                  <p className="text-gray-900 mt-0.5 font-extrabold">{currentUser.name}</p>
                </div>
                <div>
                  <span>{lang.phone}</span>
                  <p className="text-gray-900 mt-0.5 font-extrabold">{activeOrder.phone}</p>
                </div>
                <div className="col-span-2">
                  <span>{lang.address}</span>
                  <p className="text-gray-900 mt-0.5 font-extrabold">{activeOrder.address}</p>
                </div>
                {activeOrder.instructions && (
                  <div className="col-span-2">
                    <span>{lang.specialInstructions}</span>
                    <p className="text-amber-700 bg-amber-50 border border-amber-100 rounded-lg p-2.5 mt-1 font-semibold leading-relaxed">
                      💬 {activeOrder.instructions}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
