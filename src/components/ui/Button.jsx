// [O] Open/Closed — extend via variant prop
const VARIANTS = {
  primary:   'bg-[#E8572A] text-white hover:opacity-90 active:scale-95',
  secondary: 'bg-[#2A2A2A] text-white hover:opacity-90',
  danger:    'bg-red-600 text-white hover:bg-red-700',
  outline:   'border border-gray-200 text-gray-500 hover:bg-gray-50',
  ghost:     'text-gray-500 hover:bg-gray-100',
};
function Button({ children, variant = 'primary', className = '', fullWidth = false, size = 'md', disabled = false, type = 'button', ...props }) {
  const sz = size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-4 text-base' : 'px-4 py-2.5 text-sm';
  return (
    <button type={type} disabled={disabled}
      className={['rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2',
        VARIANTS[variant] ?? VARIANTS.primary, sz,
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className].join(' ')}
      {...props}>
      {children}
    </button>
  );
}
export default Button;
