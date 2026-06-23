import { useState } from 'react';
import { EyeIcon } from './Icons';

function Input({ label, type = 'text', value, onChange, placeholder, error, required = false, rows, className = '' }) {
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === 'password';
  const isTextarea = type === 'textarea';
  const base = `w-full px-4 py-3 rounded-xl border text-sm transition-all ${error ? 'border-red-400' : 'border-gray-200'} ${className}`;
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-1.5 text-gray-700">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {isTextarea ? (
          <textarea value={value} onChange={onChange} placeholder={placeholder}
            rows={rows || 3} className={`${base} resize-none`} />
        ) : (
          <input
            type={isPassword ? (showPass ? 'text' : 'password') : type}
            value={value} onChange={onChange} placeholder={placeholder}
            className={`${base} ${isPassword ? 'pr-12' : ''}`}
          />
        )}
        {isPassword && (
          <button type="button" onClick={() => setShowPass(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <EyeIcon open={showPass} />
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
export default Input;
