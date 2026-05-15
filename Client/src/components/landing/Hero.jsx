import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export const Hero = () => {
  const navigate = useNavigate();
  const handleDemo = () => {
    navigate('/contact');
  }
  const handleTrial = () => {
    navigate('/pricing');
  }
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100 via-orange-50 to-white"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              v2.0 is now live
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
              Manage Your Restaurant with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Perfect Ease.</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              From taking orders and kitchen display systems (KDS) to staff roles and menu management, RestroSuite is the all-in-one software to scale your food business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={handleTrial} className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1">
                Start 14-Day Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={handleDemo} className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-slate-50">
                Book a Demo
              </button>
            </div>
            
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Cancel anytime
              </div>
            </div>
          </motion.div>

          {/* Right Content (Mockup/Image) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:ml-10"
          >
            {/* Abstract decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-200 to-amber-200 rounded-[2.5rem] blur-2xl opacity-50 -z-10"></div>
            
            <div className="bg-slate-900 rounded-[2rem] p-2 shadow-2xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-12 bg-slate-800 flex items-center px-4 gap-2 rounded-t-[1.8rem]">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              {/* Fake Dashboard Mockup */}
              <div className="mt-10 bg-slate-50 rounded-xl overflow-hidden aspect-[4/3] flex flex-col">
                {/* Header */}
                <div className="h-14 bg-white border-b border-slate-200 flex items-center px-6 justify-between">
                  <div className="h-4 w-32 bg-slate-200 rounded"></div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
                    <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
                  </div>
                </div>
                {/* Body */}
                <div className="flex flex-1 p-4 gap-4">
                  {/* Sidebar */}
                  <div className="w-16 md:w-48 bg-white rounded-lg border border-slate-200 p-3 hidden sm:flex flex-col gap-3">
                    <div className="h-8 w-full bg-slate-100 rounded"></div>
                    <div className="h-8 w-full bg-orange-100 rounded"></div>
                    <div className="h-8 w-full bg-slate-100 rounded"></div>
                    <div className="h-8 w-full bg-slate-100 rounded"></div>
                  </div>
                  {/* Main */}
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-white rounded-lg border border-slate-200 p-4">
                        <div className="h-3 w-16 bg-slate-200 rounded mb-3"></div>
                        <div className="h-6 w-24 bg-slate-800 rounded"></div>
                      </div>
                      <div className="h-24 bg-white rounded-lg border border-slate-200 p-4">
                        <div className="h-3 w-16 bg-slate-200 rounded mb-3"></div>
                        <div className="h-6 w-24 bg-slate-800 rounded"></div>
                      </div>
                      <div className="h-24 bg-white rounded-lg border border-slate-200 p-4">
                        <div className="h-3 w-16 bg-slate-200 rounded mb-3"></div>
                        <div className="h-6 w-24 bg-slate-800 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-lg border border-slate-200 p-4">
                      <div className="h-4 w-32 bg-slate-200 rounded mb-6"></div>
                      <div className="space-y-3">
                        <div className="h-10 w-full bg-slate-50 rounded"></div>
                        <div className="h-10 w-full bg-slate-50 rounded"></div>
                        <div className="h-10 w-full bg-slate-50 rounded"></div>
                        <div className="h-10 w-full bg-slate-50 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-6 -bottom-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
            >
              <div className="bg-emerald-100 p-3 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">New Order</p>
                <p className="text-slate-900 font-bold">Table 04 • ₹1,250</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
