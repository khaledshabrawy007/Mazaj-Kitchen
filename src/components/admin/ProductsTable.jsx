import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { EditIcon, TrashIcon } from '../ui/Icons';
import { formatCurrency } from '../../utils/helpers';

function ProductsTable({ products, lang, onEdit, onToggleAvailability, onDelete }) {
  const isAr = lang.code === 'ar';

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header Panel */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-extrabold text-sm text-gray-800">
          {isAr ? 'قائمة المنتجات المتاحة' : 'Available Dishes / Products List'}
        </h3>
        <span className="text-xs text-gray-500 font-bold">
          {products.length} {lang.totalProducts || (isAr ? 'منتج' : 'products')}
        </span>
      </div>

      {/* ── Mobile card list (hidden on md+) ───────────────── */}
      <div className="md:hidden divide-y divide-gray-100">
        {products.length === 0 ? (
          <p className="py-10 text-center text-gray-400 font-semibold text-sm">
            {isAr ? 'لا توجد منتجات.' : 'No products yet.'}
          </p>
        ) : (
          products.map((p) => {
            const name = isAr ? p.nameAr : p.nameEn;
            const desc = isAr ? p.descAr : p.descEn;
            return (
              <div key={p.id} className="flex items-start gap-3 px-4 py-4">
                {/* Thumbnail */}
                <img
                  src={p.image}
                  alt={name}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-gray-100 bg-orange-50"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-extrabold text-sm text-gray-800 truncate">{name}</p>
                      <p className="text-[11px] text-gray-400 font-medium mt-0.5 truncate">{desc}</p>
                    </div>
                    <span className="text-xs font-black text-gray-900 flex-shrink-0">
                      {formatCurrency(p.price, lang.code)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-bold">
                        {p.category}
                      </span>
                      <button
                        onClick={() => onToggleAvailability(p.id)}
                        className="focus:outline-none active:scale-95 transition"
                        title={isAr ? 'اضغط لتغيير الحالة' : 'Click to toggle'}
                      >
                        <Badge
                          variant={p.available ? 'success' : 'danger'}
                          className="font-bold text-[10px] cursor-pointer"
                        >
                          {p.available ? lang.available : lang.unavailable}
                        </Badge>
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEdit(p)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition"
                        title={lang.editProduct}
                      >
                        <EditIcon size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(p.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
                        title={lang.deleteProduct}
                      >
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Desktop table (hidden below md) ────────────────── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-xs font-bold text-gray-400 border-b border-gray-100 uppercase tracking-wider">
              <th className="py-3 px-6 text-center w-16">{isAr ? 'الصورة' : 'Img'}</th>
              <th className={`py-3 px-6 ${isAr ? 'text-right' : 'text-left'}`}>{isAr ? 'اسم الطبق' : 'Dish Name'}</th>
              <th className={`py-3 px-6 ${isAr ? 'text-right' : 'text-left'}`}>{lang.category}</th>
              <th className={`py-3 px-6 ${isAr ? 'text-right' : 'text-left'}`}>{lang.price}</th>
              <th className={`py-3 px-6 ${isAr ? 'text-right' : 'text-left'}`}>{isAr ? 'حالة التوفر' : 'Availability'}</th>
              <th className="py-3 px-6 text-center w-24">{isAr ? 'إجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs font-medium text-gray-700">
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-400 font-semibold">
                  {isAr ? 'لا توجد منتجات.' : 'No products yet.'}
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const name = isAr ? p.nameAr : p.nameEn;
                return (
                  <tr key={p.id} className="hover:bg-gray-50/40 transition">
                    <td className="py-3.5 px-6 text-center">
                      <img
                        src={p.image}
                        alt={name}
                        className="w-10 h-10 rounded-lg object-cover mx-auto bg-orange-50 border border-gray-100"
                      />
                    </td>
                    <td className={`py-3.5 px-6 ${isAr ? 'text-right' : 'text-left'}`}>
                      <p className="font-extrabold text-gray-800 text-sm">{name}</p>
                      <p className="text-[10px] text-gray-400 font-bold truncate max-w-[200px] mt-0.5">
                        {isAr ? p.descAr : p.descEn}
                      </p>
                    </td>
                    <td className={`py-3.5 px-6 ${isAr ? 'text-right' : 'text-left'}`}>
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-bold">
                        {p.category}
                      </span>
                    </td>
                    <td className={`py-3.5 px-6 font-black text-gray-950 ${isAr ? 'text-right' : 'text-left'}`}>
                      {formatCurrency(p.price, lang.code)}
                    </td>
                    <td className={`py-3.5 px-6 ${isAr ? 'text-right' : 'text-left'}`}>
                      <button
                        onClick={() => onToggleAvailability(p.id)}
                        title={isAr ? 'اضغط لتغيير الحالة' : 'Click to toggle status'}
                        className="focus:outline-none transition active:scale-95"
                      >
                        {p.available ? (
                          <Badge variant="success" className="font-bold text-[10px] cursor-pointer">
                            {lang.available}
                          </Badge>
                        ) : (
                          <Badge variant="danger" className="font-bold text-[10px] cursor-pointer">
                            {lang.unavailable}
                          </Badge>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onEdit(p)}
                          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition"
                          title={lang.editProduct}
                        >
                          <EditIcon size={14} />
                        </button>
                        <button
                          onClick={() => onDelete(p.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
                          title={lang.deleteProduct}
                        >
                          <TrashIcon size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsTable;
