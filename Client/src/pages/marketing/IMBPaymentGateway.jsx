import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import axios from 'axios';
import SummaryApi from '../../common/SummaryApi';

const SUCCESS_REDIRECT_URL =
  import.meta.env.VITE_POST_PAYMENT_REDIRECT_URL ||
  'https://restorent-management-services-premi-fawn.vercel.app/';

const IMBPaymentGateway = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { planName, amount } = location.state || {
    planName: 'Selected Plan',
    amount: 0,
  };

  const [status, setStatus] = useState('processing'); // processing, success, failed
  const [message, setMessage] = useState('Processing your payment...');
  const query = new URLSearchParams(location.search);
  const orderId = query.get('orderId');

  useEffect(() => {
    const verify = async () => {
      if (!orderId) {
        setStatus('failed');
        setMessage('Missing order details. Please retry payment from registration page.');
        return;
      }

      try {
        const response = await axios.post(SummaryApi.verifySubscriptionPayment.url, { orderId });
        if (response.data?.success && response.data?.status === 'success') {
          setStatus('success');
          setMessage('Payment successful! Redirecting to restaurant login...');
          setTimeout(() => {
            window.location.href = SUCCESS_REDIRECT_URL;
          }, 1800);
          return;
        }

        setStatus('processing');
        setMessage('Payment status is pending. Please wait a moment...');
      } catch (error) {
        setStatus('failed');
        setMessage(error.response?.data?.message || 'Payment failed or cancelled. Please register again.');
      }
    };

    verify();
  }, [orderId]);

  const handleRegisterAgain = () => navigate('/pricing');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 selection:bg-orange-500 selection:text-white">
      <div className="max-w-md w-full">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-slate-900 p-6 flex items-center justify-center gap-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-orange-500/10 blur-xl rounded-full translate-y-1/2"></div>
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center relative z-10 shadow-lg shadow-orange-500/30">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white relative z-10 tracking-tight">IMB Gateway</h1>
          </div>

          <div className="p-8 text-center space-y-8">
            
            {/* Amount & Details */}
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Paying for {planName}</p>
              <h2 className="text-5xl font-black text-slate-900">₹{amount}</h2>
              <p className="text-xs text-slate-400 font-medium pt-2">Order ID: {orderId || 'N/A'}</p>
            </div>

            {/* Status Animation */}
            <div className="flex flex-col items-center justify-center py-4">
              {status === 'processing' ? (
                <div className="space-y-4 flex flex-col items-center">
                  <div className="relative">
                    <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
                    <div className="absolute inset-0 bg-orange-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-slate-600 font-bold animate-pulse">{message}</p>
                  <p className="text-xs text-slate-400">Please do not close or refresh this window</p>
                </div>
              ) : status === 'success' ? (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="space-y-4 flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-emerald-600 font-black text-xl">Payment Successful!</p>
                    <p className="text-sm text-slate-500 font-medium">{message}</p>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-4 flex flex-col items-center">
                  <p className="text-red-600 font-black text-xl">Payment Failed</p>
                  <p className="text-sm text-slate-500 font-medium text-center">{message}</p>
                  <button
                    onClick={handleRegisterAgain}
                    className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold"
                  >
                    Register Again
                  </button>
                </div>
              )}
            </div>

            {/* Security Badge */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-tight uppercase">Secured by 256-bit encryption</span>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IMBPaymentGateway;
