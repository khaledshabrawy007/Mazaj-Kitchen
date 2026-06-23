const VARIANTS = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-800',
  danger:  'bg-red-100 text-red-600',
  info:    'bg-blue-100 text-blue-700',
  orange:  'bg-orange-100 text-orange-700',
  accent:  'bg-yellow-400 text-gray-900',
};
function Badge({ children, variant = 'info', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${VARIANTS[variant] ?? VARIANTS.info} ${className}`}>
      {children}
    </span>
  );
}
export default Badge;
