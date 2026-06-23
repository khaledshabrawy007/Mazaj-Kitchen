import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import FloatingCartButton from './components/layout/FloatingCartButton';
import CartSidebar from './components/cart/CartSidebar';

// Pages
import MenuPage from './pages/MenuPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Hooks & Seeds
import useAuth from './hooks/useAuth';
import useCart from './hooks/useCart';
import useOrders from './hooks/useOrders';
import useLocalStorage from './hooks/useLocalStorage';
import { SEED_PRODUCTS } from './data/products';
import translations from './i18n/translations';

function App() {
  const [langCode, setLangCode] = useLocalStorage('langCode', 'en');
  const [page, setPage] = useState('menu');
  const [cartOpen, setCartOpen] = useState(false);

  // Load custom hooks
  const { currentUser, login, signup, logout } = useAuth();
  const { cart, addItem, removeItem, updateQty, clearCart, itemCount, subtotal } = useCart();
  const { orders, placeOrder, updateOrderStatus } = useOrders(currentUser?.id);

  // Persist products state so additions/edits remain across reloads
  const [products, setProducts] = useLocalStorage('products', SEED_PRODUCTS);

  // Set page direction (LTR vs RTL) based on language selection
  useEffect(() => {
    document.dir = langCode === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = langCode;
  }, [langCode]);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  // Current translation object
  const lang = {
    ...translations[langCode],
    code: langCode,
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    setPage('menu');
  };

  // Product mutations for Admin
  const handleSaveProduct = (prod) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === prod.id);
      if (exists) {
        return prev.map((p) => (p.id === prod.id ? prod : p));
      } else {
        return [...prev, { ...prod, id: Date.now() }];
      }
    });
  };

  const handleToggleProductAvailability = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, available: !p.available } : p))
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Filter orders for the currently logged in user (unless admin, who sees all)
  const displayedOrders =
    currentUser?.role === 'admin'
      ? orders
      : orders.filter((o) => o.userId === currentUser?.id);

  const isAdmin = currentUser?.role === 'admin';

  return (
    <div
      className="min-h-screen flex flex-col font-sans transition-colors duration-300"
      style={{ background: '#FFF8F3' }}
    >
      {/* Sticky Navbar */}
      <Navbar
        lang={lang}
        setLang={setLangCode}
        page={page}
        setPage={setPage}
        currentUser={currentUser}
        onLogout={handleLogout}
        itemCount={isAdmin ? 0 : itemCount}
        onCartOpen={() => setCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {page === 'menu' && (
          <MenuPage
            lang={lang}
            products={products}
            onAddToCart={isAdmin ? null : (prod) => {
              addItem(prod);
              setCartOpen(true);
            }}
            isAdmin={isAdmin}
          />
        )}

        {page === 'checkout' && (
          <CheckoutPage
            lang={lang}
            currentUser={currentUser}
            setPage={setPage}
            cart={cart}
            subtotal={subtotal}
            clearCart={clearCart}
            onPlaceOrder={placeOrder}
          />
        )}

        {page === 'orders' && (
          <OrdersPage
            lang={lang}
            currentUser={currentUser}
            orders={displayedOrders}
            setPage={setPage}
          />
        )}

        {page === 'admin' && (
          <AdminPage
            lang={lang}
            currentUser={currentUser}
            setPage={setPage}
            products={products}
            onSaveProduct={handleSaveProduct}
            onToggleAvailability={handleToggleProductAvailability}
            onDeleteProduct={handleDeleteProduct}
            orders={orders}
            onUpdateOrderStatus={updateOrderStatus}
          />
        )}

        {page === 'login' && (
          <LoginPage
            lang={lang}
            onLogin={login}
            setPage={setPage}
          />
        )}

        {page === 'signup' && (
          <SignupPage
            lang={lang}
            onSignup={signup}
            setPage={setPage}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs font-bold text-gray-400 border-t border-gray-100" style={{ background: '#2A2A2A' }}>
        <p>© {new Date().getFullYear()} {lang.appName}. {langCode === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
        <p className="mt-1 text-gray-500 font-semibold">{langCode === 'ar' ? 'صنع بكل حب للأكل اللذيذ 🍲' : 'Made with love for delicious food 🍲'}</p>
      </footer>

      {/* Drawer Overlay for Cart — hidden for admin */}
      {!isAdmin && (
        <CartSidebar
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          subtotal={subtotal}
          itemCount={itemCount}
          onUpdateQty={updateQty}
          onRemove={removeItem}
          onClear={clearCart}
          setPage={setPage}
          lang={lang}
        />
      )}

      {/* Floating Cart Button — hidden for admin */}
      {!isAdmin && (
        <FloatingCartButton
          itemCount={itemCount}
          subtotal={subtotal}
          onCartOpen={() => setCartOpen(true)}
          lang={lang}
        />
      )}
    </div>
  );
}

export default App;
