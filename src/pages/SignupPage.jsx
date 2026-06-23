import { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

// Password must have: min 8 chars, 1 uppercase, 1 number, 1 special character
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

function validatePassword(pw, isAr) {
  if (!pw) return isAr ? 'كلمة المرور مطلوبة' : 'Password is required';
  if (pw.length < 8)
    return isAr ? 'كلمة المرور يجب أن تكون ٨ أحرف على الأقل' : 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(pw))
    return isAr ? 'يجب أن تحتوي على حرف كبير واحد على الأقل' : 'Must contain at least one uppercase letter';
  if (!/\d/.test(pw))
    return isAr ? 'يجب أن تحتوي على رقم واحد على الأقل' : 'Must contain at least one number';
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw))
    return isAr ? 'يجب أن تحتوي على رمز خاص واحد على الأقل (!@#$%...)' : 'Must contain at least one special character (!@#$%...)';
  return null;
}

function PasswordStrengthBar({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  ];
  const strength = checks.filter(Boolean).length;
  const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < strength ? colors[strength - 1] : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {[
          { label: '8+ chars', ok: password.length >= 8 },
          { label: 'Uppercase', ok: /[A-Z]/.test(password) },
          { label: 'Number', ok: /\d/.test(password) },
          { label: 'Special (!@#...)', ok: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) },
        ].map(({ label, ok }) => (
          <span
            key={label}
            className={`text-[10px] font-bold flex items-center gap-0.5 ${ok ? 'text-green-600' : 'text-gray-400'}`}
          >
            {ok ? '✓' : '○'} {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function SignupPage({ lang, onSignup, setPage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const isAr = lang.code === 'ar';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Field presence
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError(lang.requiredField);
      return;
    }

    // Strong password check
    const pwError = validatePassword(password, isAr);
    if (pwError) {
      setError(pwError);
      return;
    }

    if (password !== confirmPassword) {
      setError(lang.passwordMismatch);
      return;
    }

    // Attempt Sign up
    const res = onSignup(name, email, password);
    if (!res.success) {
      setError(lang[res.error] || res.error);
    } else {
      setSuccess(lang.signupSuccess);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setPage('login');
      }, 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 animate-scale-up">
        {/* Title */}
        <div className="text-center mb-8">
          <span className="text-4xl">🍳</span>
          <h2 className="text-2xl font-black text-gray-900 mt-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            {lang.signup}
          </h2>
          <p className="text-xs text-gray-500 font-bold mt-1.5">{lang.tagline}</p>
        </div>

        {/* Errors / Success displays */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 mb-5 text-center text-xs font-bold text-red-600">
            ⚠ {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-3.5 mb-5 text-center text-xs font-bold text-green-700 animate-pulse">
            ✓ {success}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={lang.name}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. John Doe"
            required
          />

          <Input
            label={lang.email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mazaj.com"
            required
          />

          <div>
            <Input
              label={lang.password}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="e.g. MyPass1!"
              required
            />
            <PasswordStrengthBar password={password} />
          </div>

          <Input
            label={isAr ? 'تأكيد كلمة المرور' : 'Confirm Password'}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" variant="primary" className="w-full py-3.5 font-bold text-sm tracking-wide shadow-md mt-6">
            {lang.signup}
          </Button>
        </form>

        {/* Redirect */}
        <div className="text-center mt-6 pt-5 border-t border-gray-50 text-xs font-semibold text-gray-500">
          <span>{lang.alreadyHave}</span>{' '}
          <button onClick={() => setPage('login')} className="text-[#E8572A] hover:underline font-bold">
            {lang.login}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
