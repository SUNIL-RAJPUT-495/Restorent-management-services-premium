import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const FeatureLayout = ({ title, subtitle, description, features, icon: Icon, image }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col lg:flex-row gap-16 items-center"
        >
          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <motion.div variants={itemVariants} className="flex items-center gap-3 text-orange-500 font-bold mb-6">
              <div className="p-3 bg-orange-100 rounded-2xl">
                {Icon && <Icon size={28} />}
              </div>
              <span className="uppercase tracking-widest text-sm">{subtitle}</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
              {title}
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-10 leading-relaxed">
              {description}
            </motion.p>
            
            <motion.div variants={itemVariants} className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 bg-orange-500 rounded-full p-0.5">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                  <span className="text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all shadow-xl shadow-orange-500/20 flex items-center gap-2 group">
                Get A Free Demo
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Visual Side */}
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-orange-500 rounded-3xl blur-3xl opacity-10 animate-pulse"></div>
            <div className="relative bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden p-4">
              <div className="aspect-video bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden">
                {image ? (
                  <img src={image} alt={title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-slate-300 flex flex-col items-center gap-4">
                    {Icon && <Icon size={120} strokeWidth={1} />}
                    <span className="font-medium">Premium Visual Coming Soon</span>
                  </div>
                )}
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute bottom-10 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-50 max-w-[200px]">
                <div className="flex items-center gap-2 text-orange-500 font-bold mb-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span>Real-time</span>
                </div>
                <p className="text-sm text-slate-500">Efficiency Increased by <span className="text-slate-900 font-bold">45%</span></p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
