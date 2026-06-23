export const generateOrderId = () => `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

export const formatCurrency = (amount, lang = 'en') =>
  lang === 'ar' ? `${amount} ج.م` : `${amount} EGP`;

export const getInitial = (name = '') => name.charAt(0).toUpperCase();
