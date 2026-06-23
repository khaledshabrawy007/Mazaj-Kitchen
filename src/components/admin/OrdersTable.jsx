import Badge from '../ui/Badge';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { STATUS_STEPS } from '../../constants';

const getStatusBadgeVariant = (status) => {
  switch (status) {
    case 'placed':     return 'warning';
    case 'preparing':  return 'info';
    case 'onway':      return 'orange';
    case 'delivered':  return 'success';
    default:           return 'secondary';
  }
};

const getStatusLabel = (status, lang) => {
  switch (status) {
    case 'placed':     return lang.orderPlaced;
    case 'preparing':  return lang.orderPreparing;
    case 'onway':      return lang.orderOnWay;
    case 'delivered':  return lang.orderDelivered;
    default:           return status;
  }
};

function OrdersTable({ orders, lang, onUpdateStatus }) {
  const isAr = lang.code === 'ar';

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header Panel */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-extrabold text-sm text-gray-800">
          {isAr ? 'قائمة الطلبات الأخيرة' : 'Recent Customer Orders'}
        </h3>
        <span className="text-xs text-gray-500 font-bold">
          {orders.length} {lang.totalOrders || (isAr ? 'طلب' : 'orders')}
        </span>
      </div>

      {/* ── Mobile card list (hidden on md+) ───────────────── */}
      <div className="md:hidden divide-y divide-gray-100">
        {orders.length === 0 ? (
          <p className="py-10 text-center text-gray-400 font-semibold text-sm">
            {isAr ? 'لا توجد طلبات واردة حالياً.' : 'No incoming orders currently.'}
          </p>
        ) : (
          orders.map((o) => (
            <div key={o.id} className="px-4 py-4 space-y-3">
              {/* Top row: order id + date + total */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-black text-gray-900 font-mono text-sm">#{o.id}</span>
                  <p className="text-[11px] text-gray-400 font-semibold mt-0.5">{formatDate(o.date)}</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-gray-900 text-sm">{formatCurrency(o.total, lang.code)}</span>
                  <p className="text-[10px] text-gray-400 font-bold mt-0.5">
                    {o.paymentMethod === 'cod' ? lang.cashOnDelivery : lang.payOnline}
                  </p>
                </div>
              </div>

              {/* Customer info */}
              <div className="bg-gray-50 rounded-xl px-3 py-2.5 space-y-0.5">
                <p className="font-bold text-sm text-gray-800">{o.customerName}</p>
                <p className="text-[11px] text-gray-500 font-bold">{o.phone}</p>
                <p className="text-[11px] text-gray-400 font-medium">{o.address}</p>
              </div>

              {/* Items */}
              <div className="flex flex-wrap gap-1.5">
                {o.items.map((it) => (
                  <span key={it.id} className="text-[11px] font-bold bg-orange-50 text-orange-700 border border-orange-100 px-2 py-0.5 rounded-lg">
                    {it.qty}× {isAr ? it.nameAr : it.nameEn}
                  </span>
                ))}
              </div>

              {/* Instructions */}
              {o.instructions && (
                <p className="text-[10px] text-amber-600 bg-amber-50 rounded px-2 py-1 font-bold border border-amber-100">
                  💬 {o.instructions}
                </p>
              )}

              {/* Status row */}
              <div className="flex items-center justify-between gap-3">
                <Badge variant={getStatusBadgeVariant(o.status)} className="font-bold text-[10px]">
                  {getStatusLabel(o.status, lang)}
                </Badge>
                <select
                  value={o.status}
                  onChange={(e) => onUpdateStatus(o.id, e.target.value)}
                  className="flex-1 text-xs bg-white border border-gray-200 rounded-lg p-2 font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#E8572A]"
                >
                  {STATUS_STEPS.map((step) => (
                    <option key={step} value={step}>{getStatusLabel(step, lang)}</option>
                  ))}
                </select>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Desktop table (hidden below md) ────────────────── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-xs font-bold text-gray-400 border-b border-gray-100 uppercase tracking-wider">
              <th className={`py-3 px-6 ${isAr ? 'text-right' : 'text-left'}`}>{lang.orderNum}</th>
              <th className={`py-3 px-6 ${isAr ? 'text-right' : 'text-left'}`}>{lang.customer}</th>
              <th className={`py-3 px-6 ${isAr ? 'text-right' : 'text-left'}`}>{isAr ? 'العناصر المطلوبة' : 'Ordered Items'}</th>
              <th className={`py-3 px-6 ${isAr ? 'text-right' : 'text-left'}`}>{lang.total}</th>
              <th className={`py-3 px-6 ${isAr ? 'text-right' : 'text-left'}`}>{lang.status}</th>
              <th className={`py-3 px-6 ${isAr ? 'text-right' : 'text-left'}`}>{lang.date}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs font-medium text-gray-700">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-400 font-semibold">
                  {isAr ? 'لا توجد طلبات واردة حالياً.' : 'No incoming orders currently.'}
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/40 transition align-top">
                  <td className={`py-4 px-6 ${isAr ? 'text-right' : 'text-left'}`}>
                    <span className="font-extrabold text-gray-900 font-mono tracking-tight">#{o.id}</span>
                  </td>
                  <td className={`py-4 px-6 ${isAr ? 'text-right' : 'text-left'}`}>
                    <p className="font-bold text-gray-800">{o.customerName}</p>
                    <p className="text-[10px] text-gray-500 font-bold mt-0.5">{o.phone}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-0.5 truncate max-w-[150px]">{o.address}</p>
                  </td>
                  <td className={`py-4 px-6 ${isAr ? 'text-right' : 'text-left'}`}>
                    <ul className="space-y-0.5 max-w-[200px]">
                      {o.items.map((it) => (
                        <li key={it.id} className="truncate">
                          <span className="font-bold text-[#E8572A]">{it.qty}x</span>{' '}
                          <span className="text-gray-600">{isAr ? it.nameAr : it.nameEn}</span>
                        </li>
                      ))}
                    </ul>
                    {o.instructions && (
                      <p className="text-[10px] text-amber-600 bg-amber-50 rounded px-1.5 py-0.5 mt-1.5 font-bold inline-block border border-amber-100">
                        💬 {o.instructions}
                      </p>
                    )}
                  </td>
                  <td className={`py-4 px-6 font-black text-gray-950 ${isAr ? 'text-right' : 'text-left'}`}>
                    <div>{formatCurrency(o.total, lang.code)}</div>
                    <div className="text-[9px] text-gray-400 font-bold mt-0.5">
                      {o.paymentMethod === 'cod' ? lang.cashOnDelivery : lang.payOnline}
                    </div>
                  </td>
                  <td className={`py-4 px-6 ${isAr ? 'text-right' : 'text-left'}`}>
                    <div className="flex flex-col gap-1.5">
                      <Badge variant={getStatusBadgeVariant(o.status)} className="font-bold text-[10px] w-fit">
                        {getStatusLabel(o.status, lang)}
                      </Badge>
                      <select
                        value={o.status}
                        onChange={(e) => onUpdateStatus(o.id, e.target.value)}
                        className="text-[10px] bg-white border border-gray-200 rounded p-1 font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#E8572A]"
                      >
                        {STATUS_STEPS.map((step) => (
                          <option key={step} value={step}>{getStatusLabel(step, lang)}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className={`py-4 px-6 text-gray-400 font-semibold ${isAr ? 'text-right' : 'text-left'}`}>
                    {formatDate(o.date)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTable;
export { getStatusLabel, getStatusBadgeVariant };
