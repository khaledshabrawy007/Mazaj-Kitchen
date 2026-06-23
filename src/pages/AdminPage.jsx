import { useState } from 'react';
import KpiCard from '../components/admin/KpiCard';
import ProductsTable from '../components/admin/ProductsTable';
import OrdersTable from '../components/admin/OrdersTable';
import ProductModal from '../components/admin/ProductModal';
import Button from '../components/ui/Button';

function AdminPage({
  lang,
  currentUser,
  setPage,
  products,
  onSaveProduct,
  onToggleAvailability,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
}) {
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const isAr = lang.code === 'ar';

  // Security Check: Only allow admin role users
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 flex flex-col items-center">
          <span className="text-5xl mb-4 animate-bounce-subtle">🚫</span>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {isAr ? 'عذراً! غير مصرح لك بالدخول' : 'Access Denied'}
          </h2>
          <p className="text-sm text-gray-500 font-medium mb-6">
            {isAr
              ? 'هذه الصفحة مخصصة لمدير النظام فقط. يرجى تسجيل الدخول بحساب مسؤول.'
              : 'This section is restricted to administrators only. Please log in with admin privileges.'}
          </p>
          <div className="flex flex-col gap-2 w-full">
            <Button onClick={() => setPage('login')} variant="primary" className="w-full font-bold">
              {lang.login}
            </Button>
            <Button onClick={() => setPage('menu')} variant="secondary" className="w-full font-bold">
              {isAr ? 'العودة للقائمة الرئيسية' : 'Back to Main Menu'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats KPIs
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'delivered').length;
  const totalProductsCount = products.length;

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-none" style={{ fontFamily: 'Playfair Display, serif' }}>
            {lang.admin}
          </h1>
          <p className="text-xs text-gray-500 font-bold mt-1.5">
            {isAr ? 'لوحة تحكم وإدارة مطبخ مزاج كيتشن' : 'Mazaj Kitchen portal administration & stats panel'}
          </p>
        </div>

        {activeTab === 'products' && (
          <Button onClick={handleAdd} variant="primary" className="px-5 py-2.5 font-bold shadow-md">
            + {lang.addProduct}
          </Button>
        )}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard
          title={lang.totalOrders}
          value={totalOrders}
          icon="📦"
          color="dark"
        />
        <KpiCard
          title={lang.revenue}
          value={`${isAr ? 'ج.م' : 'EGP'} ${totalRevenue.toLocaleString()}`}
          icon="💰"
          color="green"
        />
        <KpiCard
          title={lang.activeOrders}
          value={activeOrdersCount}
          icon="🔥"
          color="orange"
        />
        <KpiCard
          title={lang.totalProducts || (isAr ? 'إجمالي المنتجات' : 'Total Products')}
          value={totalProductsCount}
          icon="🍔"
          color="yellow"
        />
      </div>

      {/* Tab Switcher & Views */}
      <div className="space-y-6">
        <div className="border-b border-gray-200">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-4 text-sm font-bold border-b-2 transition-all ${
                activeTab === 'products'
                  ? 'border-[#E8572A] text-[#E8572A]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {lang.manageProducts}
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-4 text-sm font-bold border-b-2 transition-all ${
                activeTab === 'orders'
                  ? 'border-[#E8572A] text-[#E8572A]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {lang.manageOrders}
            </button>
          </div>
        </div>

        {activeTab === 'products' ? (
          <ProductsTable
            products={products}
            lang={lang}
            onEdit={handleEdit}
            onToggleAvailability={onToggleAvailability}
            onDelete={onDeleteProduct}
          />
        ) : (
          <OrdersTable
            orders={orders}
            lang={lang}
            onUpdateStatus={onUpdateOrderStatus}
          />
        )}
      </div>

      {/* Edit/Create Modal Overlay */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onSave={onSaveProduct}
        lang={lang}
      />
    </div>
  );
}

export default AdminPage;
