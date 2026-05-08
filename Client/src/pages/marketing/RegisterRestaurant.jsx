import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Store, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  User, 
  CheckCircle2, 
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  ChefHat,
  Smartphone,
  Banknote,
  QrCode,
  ShieldAlert
} from 'lucide-react';
import SummaryApi from '../../common/SummaryApi';
import axiosSuperAdminApi from '../../utils/axiosSuperAdmin';
import axios from 'axios';

const RegisterRestaurant = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPlan } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    ownerName: '',
  });

  const [loading, setLoading] = useState(false);

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">No plan selected</h2>
        <Link to="/pricing" className="text-orange-500 font-bold hover:underline">Go back to pricing</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const reserveRes = await axiosSuperAdminApi({
        url: SummaryApi.createSubscriptionReservation.url,
        method: SummaryApi.createSubscriptionReservation.method,
        data: {
          ...formData,
          planId: selectedPlan._id,
        }
      });

      if (reserveRes.data.success) {
        const reservationId = reserveRes.data?.reservation?._id;
        if (!reservationId) {
          throw new Error("Reservation created but reservationId missing");
        }

        alert(reserveRes.data.message || "Registration created. Redirecting to secure payment gateway...");
        
        const subPayload = {
            reservationId,
        };
        const imbRes = await axios.post(SummaryApi.createSubscriptionPayment.url, subPayload);
        
        if (imbRes.data.success && imbRes.data.payment_url) {
            window.location.href = imbRes.data.payment_url;
        } else {
            throw new Error(imbRes.data.message || "Failed to get payment URL");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (val, unit) => {
    if (val === 0) return 'Trial';
    const singularUnit = unit.endsWith('s') ? unit.slice(0, -1) : unit;
    return `${val} ${val === 1 ? singularUnit : unit}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4 selection:bg-orange-500 selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-full border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-200 transition-all shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Setup Your Restaurant</h1>
            <p className="text-slate-500 text-sm">Complete the details below to start your {selectedPlan.name} journey.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 md:p-10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Restaurant Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Restaurant Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Store className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                        placeholder="e.g. Delicious Bites"
                      />
                    </div>
                  </div>

                  {/* Owner Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Owner Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        required
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                        placeholder="contact@restaurant.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Restaurant Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 pt-3 items-start pointer-events-none">
                      <MapPin className="h-5 w-5 text-slate-400" />
                    </div>
                    <textarea
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none"
                      placeholder="Full street address, city, state, zip code"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Account Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      required
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                      placeholder="Min. 8 characters"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all shadow-xl ${
                      loading 
                        ? 'bg-slate-400 cursor-not-allowed' 
                        : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25'
                    }`}
                  >
                    {loading ? 'Processing...' : 'Complete Registration & Pay'}
                  </button>
                </div>

                <p className="text-center text-xs text-slate-500 mt-6">
                  By clicking "Complete Registration", you agree to our 
                  <a href="#" className="text-orange-500 font-bold hover:underline mx-1">Terms of Service</a> 
                  and 
                  <a href="#" className="text-orange-500 font-bold hover:underline mx-1">Privacy Policy</a>.
                </p>

              </form>
            </motion.div>
          </div>

          {/* Sidebar Plan Summary & Payment */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-28 space-y-6"
            >
              {/* Plan Card / Order Summary */}
              <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-orange-500 rounded-lg">
                        <ChefHat className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Order Summary</h3>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Selected Plan</h4>
                        <div className="flex justify-between items-end">
                          <span className="text-2xl font-black text-white">{selectedPlan.name}</span>
                          <span className="text-orange-500 text-sm font-bold bg-orange-500/10 px-2 py-0.5 rounded">
                            {formatDuration(selectedPlan.durationValue, selectedPlan.durationUnit)}
                          </span>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-800">
                        <ul className="space-y-3">
                          {selectedPlan.features.slice(0, 5).map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                              {feature}
                            </li>
                          ))}
                          {selectedPlan.features.length > 5 && (
                            <li className="text-xs text-slate-500 italic pl-7">
                              + {selectedPlan.features.length - 5} more features
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="pt-6 border-t border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-400 text-sm">Subtotal</span>
                          <span className="text-white font-bold">₹{selectedPlan.price}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-slate-400 text-sm">Tax (0%)</span>
                          <span className="text-white font-bold">₹0</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-800 -mx-8 px-8 py-4 mt-4">
                          <span className="text-white font-bold">Total Amount</span>
                          <span className="text-2xl font-black text-orange-500">₹{selectedPlan.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              {/* End of Order Summary */}

              {/* Security Badge */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-4 shadow-sm">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Secure Checkout</h4>
                  <p className="text-xs text-slate-500">Your data is protected with 256-bit SSL encryption.</p>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterRestaurant;
