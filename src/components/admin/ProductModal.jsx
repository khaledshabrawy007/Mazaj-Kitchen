import { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { XIcon } from '../ui/Icons';
import { CATEGORIES } from '../../constants';

const DEFAULT_FORM = {
  nameEn: '',
  nameAr: '',
  descEn: '',
  descAr: '',
  price: '',
  category: 'Burgers',
  image: '',
  available: true,
};

function ProductModal({ isOpen, onClose, product, onSave, lang }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});
  const isAr = lang.code === 'ar';

  useEffect(() => {
    if (product) {
      setForm({
        ...product,
        price: product.price.toString(),
      });
    } else {
      // Default image to a random dummy SVG if adding new
      setForm({
        ...DEFAULT_FORM,
        image: `data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="#E8572A"/><text x="50%" y="50%" font-size="80" text-anchor="middle" dominant-baseline="middle">🍲</text></svg>`
        )}`,
      });
    }
    setErrors({});
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleValidate = () => {
    const errs = {};
    if (!form.nameEn.trim()) errs.nameEn = lang.requiredField;
    if (!form.nameAr.trim()) errs.nameAr = lang.requiredField;
    if (!form.price.trim() || isNaN(form.price) || parseFloat(form.price) <= 0) {
      errs.price = isAr ? 'السعر يجب أن يكون رقماً أكبر من الصفر' : 'Price must be a number greater than 0';
    }
    if (!form.image.trim()) errs.image = lang.requiredField;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleValidate()) return;

    onSave({
      ...form,
      price: parseFloat(form.price),
      rating: product ? product.rating : 5.0,
      reviews: product ? product.reviews : 1,
    });
    onClose();
  };

  const cleanCategories = CATEGORIES.filter(c => c !== 'All');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop overlay */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[#2A2A2A]/40 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        ></div>

        {/* Center the modal content */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div
          className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-scale-up"
        >
          {/* Header */}
          <div className="px-6 py-5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-900">
              {product
                ? isAr
                  ? 'تعديل بيانات المنتج'
                  : 'Edit Product details'
                : isAr
                ? 'إضافة منتج جديد'
                : 'Create New Product'}
            </h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
            >
              <XIcon size={18} />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={isAr ? 'اسم المنتج (EN)' : 'Product Name (EN)'}
                value={form.nameEn}
                onChange={(e) => handleChange('nameEn', e.target.value)}
                error={errors.nameEn}
                required
              />
              <Input
                label={isAr ? 'اسم المنتج (AR)' : 'Product Name (AR)'}
                value={form.nameAr}
                onChange={(e) => handleChange('nameAr', e.target.value)}
                error={errors.nameAr}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label={isAr ? 'الوصف (EN)' : 'Description (EN)'}
                value={form.descEn}
                onChange={(e) => handleChange('descEn', e.target.value)}
                rows={2}
              />
              <Input
                label={isAr ? 'الوصف (AR)' : 'Description (AR)'}
                value={form.descAr}
                onChange={(e) => handleChange('descAr', e.target.value)}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Category selector */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  {lang.category} <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-200 rounded-xl text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#E8572A] focus:border-transparent"
                >
                  {cleanCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label={`${lang.price} (${isAr ? 'ج.م' : 'EGP'})`}
                type="text"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                error={errors.price}
                required
              />
            </div>

            <Input
              label={lang.productImg}
              value={form.image}
              onChange={(e) => handleChange('image', e.target.value)}
              error={errors.image}
              required
            />

            {/* Availability switch */}
            <div className="flex items-center gap-3 py-2 border-t border-gray-50">
              <input
                id="modal-available"
                type="checkbox"
                checked={form.available}
                onChange={(e) => handleChange('available', e.target.checked)}
                className="w-5 h-5 text-[#E8572A] border-gray-300 rounded focus:ring-[#E8572A] accent-[#E8572A] cursor-pointer"
              />
              <label htmlFor="modal-available" className="text-sm font-bold text-gray-700 cursor-pointer">
                {isAr ? 'هذا المنتج متاح للطلب الفوري' : 'This product is available for immediate ordering'}
              </label>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100 mt-6">
              <Button type="button" onClick={onClose} variant="secondary" className="px-5 py-2 text-xs font-bold">
                {lang.cancel}
              </Button>
              <Button type="submit" variant="primary" className="px-5 py-2 text-xs font-bold shadow-md">
                {lang.save}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
