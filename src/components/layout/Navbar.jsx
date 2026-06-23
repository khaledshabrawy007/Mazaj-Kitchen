import { useState } from 'react';
import { CartIcon, MenuIcon, XIcon } from '../ui/Icons';
import { getInitial } from '../../utils/helpers';

function Navbar({ lang, setLang, page, setPage, currentUser, onLogout, itemCount, onCartOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const isAdmin = currentUser?.role === 'admin';
  const navLinks = [
    { key: 'menu', label: lang.menu },
    ...(currentUser && !isAdmin ? [{ key: 'orders', label: lang.orders }] : []),
    ...(isAdmin ? [{ key: 'admin', label: lang.admin }] : []),
  ];
  return (
    <nav className="sticky top-0 z-30 shadow-lg" style={{ background: '#2A2A2A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setPage('menu')} className="flex items-center gap-2">
            <span style={{ fontSize: '1.4rem' }}>🍴</span>
            <span className="text-xl font-bold" style={{ color: '#E8572A', fontFamily: 'Playfair Display, serif' }}>{lang.appName}</span>
          </button>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <button key={l.key} onClick={() => setPage(l.key)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ color: page === l.key ? '#E8572A' : 'rgba(255,255,255,0.8)', borderBottom: page === l.key ? '2px solid #E8572A' : '2px solid transparent' }}>
                {l.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang.code === 'en' ? 'ar' : 'en')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.9)', background: 'rgba(255,255,255,0.08)' }}>
              {lang.code === 'en' ? 'عر' : 'EN'}
            </button>
            {!isAdmin && (
              <button onClick={onCartOpen} className="relative p-2 rounded-lg" style={{ color: 'white', background: 'rgba(255,255,255,0.08)' }}>
                <CartIcon />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                    style={{ background: '#E8572A', color: 'white' }}>{itemCount}</span>
                )}
              </button>
            )}
            {currentUser ? (
              <div className="relative">
                {/* Avatar button — toggles dropdown on click/tap */}
                <button
                  onClick={() => setProfileOpen(v => !v)}
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: '#E8572A', color: 'white' }}
                >
                  {getInitial(currentUser.name)}
                </button>

                {/* Click-away backdrop */}
                {profileOpen && (
                  <div
                    className="fixed inset-0"
                    style={{ zIndex: 40 }}
                    onClick={() => setProfileOpen(false)}
                  />
                )}

                {/* Dropdown panel */}
                {profileOpen && (
                  <div
                    className={`absolute top-full mt-2 w-56 ${isAdmin ? 'min-w-[220px]' : ''}`}
                    style={{
                      zIndex: 50,
                      [lang.code === 'ar' ? 'left' : 'right']: 0,
                    }}
                  >
                    <div className="rounded-xl shadow-xl overflow-hidden" style={{ background: 'white', border: '1px solid #E5E7EB' }}>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-sm text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-500 break-all mt-0.5">{currentUser.email}</p>
                      </div>
                      <button
                        onClick={() => { onLogout(); setProfileOpen(false); }}
                        className="w-full px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                        style={{ textAlign: lang.code === 'ar' ? 'right' : 'left' }}
                      >
                        {lang.logout}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setPage('login')} className="hidden sm:block px-4 py-1.5 rounded-lg text-sm font-semibold"
                style={{ background: '#E8572A', color: 'white' }}>{lang.login}</button>
            )}
            <button className="md:hidden p-2 rounded-lg" style={{ color: 'white' }} onClick={() => setMobileOpen(v => !v)}>
              {mobileOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {/* User info strip in mobile menu */}
            {currentUser && (
              <div className="px-4 py-3 mb-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-sm font-bold text-white">{currentUser.name}</p>
                <p className="text-[11px] text-gray-400 font-medium break-all mt-0.5">{currentUser.email}</p>
              </div>
            )}
            {navLinks.map(l => (
              <button key={l.key} onClick={() => { setPage(l.key); setMobileOpen(false); }}
                className="block w-full text-left px-4 py-3 text-sm font-medium"
                style={{ color: page === l.key ? '#E8572A' : 'rgba(255,255,255,0.8)' }}>{l.label}</button>
            ))}
            {!currentUser && (
              <button onClick={() => { setPage('login'); setMobileOpen(false); }}
                className="block w-full text-left px-4 py-3 text-sm font-semibold" style={{ color: '#E8572A' }}>{lang.login}</button>
            )}
            {currentUser && (
              <button onClick={() => { onLogout(); setMobileOpen(false); }}
                className="block w-full text-left px-4 py-3 text-sm text-red-400 font-semibold">{lang.logout}</button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
