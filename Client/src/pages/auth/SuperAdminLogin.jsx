import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AxiosSuperAdmin from '../../utils/axiosSuperAdmin';
import SummaryApi from '../../common/SummaryApi';
export const SuperAdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await AxiosSuperAdmin({
        url: SummaryApi.loginSuperAdmin.url,
        method: SummaryApi.loginSuperAdmin.method,
        data: { email, password }
      })

      if (!response.data.success && response.status !== 200) {
        throw new Error(response.data.message || 'Login failed');
      }

      // Save token (using localStorage for now)
      localStorage.setItem('restaurantmanagementsoftwaresuperadmin', response.data.token);

      // Redirect to super admin dashboard
      navigate('/super-admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-orange-500 selection:text-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">

        {/* Logo / Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 shadow-2xl mb-6">
            <ShieldCheck className="w-10 h-10 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Super Admin Portal</h1>
          <p className="text-slate-400">RestroSuite System Management</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700 shadow-2xl p-8">

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-slate-500"
                  placeholder="adminSuper@gmail.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-300">Password</label>
                <a href="#" className="text-sm text-orange-500 hover:text-orange-400 transition-colors font-medium">Forgot?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-slate-500"
                  placeholder="admin123"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 font-semibold py-3.5 px-4 rounded-xl transition-all shadow-lg ${loading
                  ? 'bg-slate-600 text-slate-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-500/20'
                }`}
            >
              {loading ? 'Authenticating...' : 'Secure Login'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>

          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              Secured by 256-bit encryption. Authorized personnel only.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
