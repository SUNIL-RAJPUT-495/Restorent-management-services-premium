import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Store, 
  ChefHat,
  Crown, 
  AlertTriangle, 
  CheckCircle2, 
  LogOut, 
  Loader2, 
  Zap, 
  ShieldCheck, 
  ArrowLeft,
  Banknote,
  Smartphone,
  QrCode
} from "lucide-react";
import AxiosAdmin from "@/utils/axiosAdmin";
import SummaryApi from "@/common/SummerAPI";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const SubscriptionExpired = () => {
  const navigate = useNavigate();
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const adminInfo = (() => {
    try {
      return JSON.parse(localStorage.getItem("rw_admin_info") || "{}");
    } catch {
      return {};
    }
  })();

  const restaurant = adminInfo?.restaurant || adminInfo;

  // Fetch SaaS Plans
  const { data: plans = [], isLoading: loadingPlans } = useQuery({
    queryKey: ["saas-plans"],
    queryFn: async () => {
      const response = await AxiosAdmin.get(SummaryApi.getAllSaasPlans.url);
      const activePlans = response.data.data.filter(p => p.active);
      if (activePlans.length > 0 && !selectedPlanId) {
          setSelectedPlanId(activePlans[0]._id);
      }
      return activePlans;
    },
  });

  const selectedPlan = plans.find(p => p._id === selectedPlanId);

  // Payment Mutation
  const paymentMutation = useMutation({
    mutationFn: async (planId) => {
      const payload = {
        restaurantId: restaurant._id,
        planId: planId,
      };
      const response = await AxiosAdmin.post(SummaryApi.createSubscriptionPayment.url, payload);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        toast.error("Failed to generate payment link");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Payment initiation failed. Please check your internet connection.");
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("resto_auth_token");
    localStorage.removeItem("rw_admin_info");
    window.location.href = "/admin/login";
  };

  const formatDuration = (val, unit) => {
    if (val === 0) return 'Trial';
    const singularUnit = unit.endsWith('s') ? unit.slice(0, -1) : unit;
    return `${val} ${val === 1 ? singularUnit : unit}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-12 px-4 selection:bg-orange-500 selection:text-white font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <button 
                    onClick={handleLogout}
                    className="p-2 bg-white rounded-full border border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-200 transition-all shadow-sm"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Subscription Status</h1>
                    <p className="text-slate-500 text-sm">Your premium access has expired. Choose a plan to continue.</p>
                </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 shadow-sm animate-pulse">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Access Expired</span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Plans Grid */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {loadingPlans ? (
                  <div className="col-span-full h-64 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200 border-dashed">
                      <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
                      <p className="text-slate-500 font-medium">Fetching premium plans...</p>
                  </div>
              ) : (
                plans.map((plan) => (
                  <div 
                    key={plan._id}
                    onClick={() => setSelectedPlanId(plan._id)}
                    className={`relative cursor-pointer group bg-white rounded-3xl border-2 transition-all duration-300 p-6 ${
                      selectedPlanId === plan._id 
                        ? 'border-orange-500 shadow-xl shadow-orange-500/10' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute -top-3 -right-3">
                        <div className="bg-orange-500 text-white text-[10px] font-black uppercase py-1.5 px-4 rounded-full shadow-lg shadow-orange-500/30">
                          Popular
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-2xl transition-colors ${
                            selectedPlanId === plan._id ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                            <Crown className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 uppercase tracking-tight">{plan.name}</h3>
                            <p className="text-xs text-slate-500">Full Premium Access</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-slate-900">₹{plan.price}</span>
                            <span className="text-slate-400 text-sm font-medium">/ {formatDuration(plan.durationValue, plan.durationUnit)}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {plan.features.slice(0, 4).map((f, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <span className="text-xs text-slate-600 line-clamp-1">{f}</span>
                            </div>
                        ))}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-12 space-y-6"
            >
              {/* Order Summary Card */}
              <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-orange-500 rounded-lg">
                        <ChefHat className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Renewal Summary</h3>
                    </div>

                    <AnimatePresence mode="wait">
                      {selectedPlan ? (
                        <motion.div 
                          key={selectedPlan._id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-6"
                        >
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
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-slate-400 text-sm">Base Price</span>
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

                          <Button 
                            disabled={paymentMutation.isPending}
                            onClick={() => paymentMutation.mutate(selectedPlan._id)}
                            className={`w-full py-6 rounded-2xl font-bold text-lg transition-all shadow-xl bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25`}
                          >
                            {paymentMutation.isPending ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>Renew & Activate Now <Zap className="ml-2 w-5 h-5 fill-current" /></>
                            )}
                          </Button>
                        </motion.div>
                      ) : (
                        <div className="h-40 flex items-center justify-center text-slate-500 italic">
                            Select a plan to see summary
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-4 shadow-sm">
                    <div className="p-2 bg-emerald-50 rounded-xl">
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Secure Payment</h4>
                      <p className="text-[10px] text-slate-500">256-bit SSL encrypted checkout</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-4 shadow-sm">
                    <div className="p-2 bg-blue-50 rounded-xl">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Instant Access</h4>
                      <p className="text-[10px] text-slate-500">Account activated immediately after pay</p>
                    </div>
                  </div>
              </div>

              <div className="text-center">
                  <button 
                    onClick={handleLogout}
                    className="text-slate-400 hover:text-red-500 text-xs font-bold transition-colors inline-flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out from {restaurant?.name}
                  </button>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SubscriptionExpired;
