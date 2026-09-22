import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  KeyRound, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2,
  Building2,
  UserCheck,
  ArrowRight
} from 'lucide-react';
import { AdminUser } from '../types';
import { DEFAULT_ADMIN_USERS } from '../data/labData';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const cleanUser = username.trim().toLowerCase();
      const cleanPass = password.trim();

      // Check predefined users or general admin fallback
      let matchedUser: AdminUser | undefined;

      if (cleanUser === 'admin' && (cleanPass === 'admin123' || cleanPass === 'bulungan2026' || cleanPass === 'admin')) {
        matchedUser = DEFAULT_ADMIN_USERS[0];
      } else if (cleanUser === 'manajer.mutu' && (cleanPass === 'mutu123' || cleanPass === 'admin123')) {
        matchedUser = DEFAULT_ADMIN_USERS[1];
      } else if (cleanUser === 'manajer.teknis' && (cleanPass === 'teknis123' || cleanPass === 'admin123')) {
        matchedUser = DEFAULT_ADMIN_USERS[2];
      } else if (cleanUser === 'petugas.loket' && (cleanPass === 'loket123' || cleanPass === 'admin123')) {
        matchedUser = DEFAULT_ADMIN_USERS[3];
      } else if (cleanUser && (cleanPass === 'admin123' || cleanPass === 'bulungan2026')) {
        // Any custom username with default administrative password
        matchedUser = {
          username: cleanUser,
          name: cleanUser.toUpperCase(),
          role: 'Administrator Utama',
          lastLogin: new Date().toLocaleString('id-ID')
        };
      }

      if (matchedUser) {
        const loggedUser: AdminUser = {
          ...matchedUser,
          lastLogin: new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }) + ' WITA'
        };

        if (rememberMe) {
          localStorage.setItem('dlh_admin_auth', JSON.stringify(loggedUser));
        }

        onLoginSuccess(loggedUser);
        onClose();
      } else {
        setErrorMsg('Username atau Kata Sandi salah. Silakan periksa kembali atau gunakan tombol Akses Cepat di bawah.');
      }
    }, 400);
  };

  const handleQuickSelect = (userKey: string, passKey: string) => {
    setUsername(userKey);
    setPassword(passKey);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-scaleUp">
        
        {/* Header & Logo */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-800 to-slate-900 text-amber-300 flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  LOGIN PETUGAS & ADMIN
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-serif-display leading-snug">
                Portal Manajemen Laboratorium
              </h3>
              <p className="text-[11px] text-slate-500">
                UPTD Lab Lingkungan DLH Kab. Bulungan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              Username / ID Petugas
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="cth: admin"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 focus:border-teal-600 rounded-xl focus:outline-none focus:bg-white text-slate-900 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5 flex items-center justify-between">
              <span>Kata Sandi (Password)</span>
              <span className="text-[10px] text-slate-400 font-normal">Min. 6 Karakter</span>
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 focus:border-teal-600 rounded-xl focus:outline-none focus:bg-white text-slate-900 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-3.5 h-3.5"
              />
              <span className="text-[11px]">Ingat Sesi di Browser Ini</span>
            </label>
            <span className="text-[11px] text-teal-700 font-semibold cursor-default">
              Audit KAN ISO 17025
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-teal-800 to-teal-900 hover:from-teal-700 hover:to-teal-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Memverifikasi Kredensial...</span>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-300" />
                <span>Masuk ke Dashboard Kelola Menu</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Credentials Selector */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
          <div className="flex items-center gap-1.5 text-slate-700 font-bold text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Pilihan Akun Siap Pakai (1 Klik):</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <button
              type="button"
              onClick={() => handleQuickSelect('admin', 'admin123')}
              className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                username === 'admin' 
                  ? 'bg-teal-50 border-teal-400 text-teal-900 font-bold' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="font-bold text-slate-900">👑 Administrator</div>
              <div className="text-slate-500 font-mono text-[9px]">admin / admin123</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickSelect('manajer.mutu', 'mutu123')}
              className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                username === 'manajer.mutu' 
                  ? 'bg-teal-50 border-teal-400 text-teal-900 font-bold' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="font-bold text-slate-900">📋 Manajer Mutu</div>
              <div className="text-slate-500 font-mono text-[9px]">mutu / mutu123</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickSelect('manajer.teknis', 'teknis123')}
              className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                username === 'manajer.teknis' 
                  ? 'bg-teal-50 border-teal-400 text-teal-900 font-bold' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="font-bold text-slate-900">🧪 Manajer Teknis</div>
              <div className="text-slate-500 font-mono text-[9px]">teknis / teknis123</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickSelect('petugas.loket', 'loket123')}
              className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                username === 'petugas.loket' 
                  ? 'bg-teal-50 border-teal-400 text-teal-900 font-bold' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="font-bold text-slate-900">🏢 Petugas Loket TU</div>
              <div className="text-slate-500 font-mono text-[9px]">loket / loket123</div>
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-[10px] text-slate-400 text-center leading-relaxed">
          Sistem Informasi Laboratorium Lingkungan DLH Bulungan dilengkapi pembatasan hak akses berbasis peran (RBAC) dan enkripsi dokumen hasil uji KAN.
        </div>

      </div>
    </div>
  );
};
