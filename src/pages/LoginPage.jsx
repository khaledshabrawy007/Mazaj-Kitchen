import { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

function LoginPage({ lang, onLogin, setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isAr = lang.code === 'ar';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError(lang.requiredField);
      return;
    }

    const res = onLogin(email, password);
    if (!res.success) {
      setError(lang[res.error] || res.error);
    } else {
      // Redirect based on role
      if (res.user.role === 'admin') {
        setPage('admin');
      } else {
        setPage('menu');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 animate-scale-up">
        {/* Title */}
        <div className="text-center mb-8">
          <span className="text-4xl">🔑</span>
          <h2 className="text-2xl font-black text-gray-900 mt-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            {lang.welcomeBack}
          </h2>
          <p className="text-xs text-gray-500 font-bold mt-1.5">{lang.tagline}</p>
        </div>

        {/* Errors display */}
        {error && (
          <div className="bg-red-50 border border-red-150 rounded-2xl p-3.5 mb-5 text-center text-xs font-bold text-red-600">
            ⚠ {error}
          </div>
        )}

        {/* Inputs form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={lang.email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mazaj.com"
            required
          />

          <Input
            label={lang.password}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" variant="primary" className="w-full py-3.5 font-bold text-sm tracking-wide shadow-md mt-6">
            {lang.login}
          </Button>
        </form>

        {/* Redirect */}
        <div className="text-center mt-6 pt-5 border-t border-gray-50 text-xs font-semibold text-gray-500">
          <span>{lang.newHere}</span>{' '}
          <button onClick={() => setPage('signup')} className="text-[#E8572A] hover:underline font-bold">
            {lang.signup}
          </button>
        </div>

        {/* Mock accounts credentials helper card for reviewers */}
        <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-bold text-gray-400 leading-normal">
          <p className="text-gray-500 uppercase tracking-wider mb-2 text-center border-b border-gray-200 pb-1">
            {isAr ? '📋 الحسابات التجريبية' : '📋 Demo Accounts'}
          </p>
          <div className="grid grid-cols-2 gap-3 mt-1.5">
            <div>
              <p className="text-[#E8572A] uppercase">{isAr ? 'حساب المستخدم' : 'User Account'}</p>
              <p className="text-gray-600 mt-0.5">Email: user@mazaj.com</p>
              <p className="text-gray-600">Pass: User@1234</p>
            </div>
            <div>
              <p className="text-[#E8572A] uppercase">{isAr ? 'حساب المشرف' : 'Admin Account'}</p>
              <p className="text-gray-600 mt-0.5">Email: admin@mazaj.com</p>
              <p className="text-gray-600">Pass: Admin@123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
