import React from 'react';
import { FileText, BarChart3, TrendingUp, PieChart, Download, Mail, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { FeatureLayout } from '../../../components/landing/FeatureLayout';
import analyticsImg from '../../../assets/pos/analytics.png';

export const Report = () => {
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

  const ImagePlaceholder = ({ icon: Icon }) => (
    <div className="w-full aspect-video bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 flex items-center justify-center group">
      <div className="p-8 bg-orange-50 rounded-full group-hover:scale-110 transition-transform duration-500">
        {Icon && <Icon size={64} className="text-orange-500" />}
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <FeatureLayout
        icon={FileText}
        image={analyticsImg}
        subtitle="Report & Analytics"
        title="Transform Data into Actionable Insights"
        description="Stay on top of your daily business performance and predict future trends with RESTOSOFTIN's integrated reporting and AI-driven analytics dashboard."
        features={[
          "Daily, Weekly & Monthly Sales Reports",
          "Staff Performance & Shifts Tracking",
          "AI-Powered Predictive Sales Forecasting",
          "Cost-Profit Margin Deep Dives",
          "End-of-Day Automated Email Reports"
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className='text-center mb-20'
        >
          <motion.h2 variants={itemVariants} className='text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight max-w-4xl mx-auto'>
            Comprehensive Operational & Strategic Insights
          </motion.h2>
        </motion.div>

        {/* Section 1: Operational Reports */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={FileText} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Detailed <span className="text-orange-500">Operational Reports</span>
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Monitor the heartbeat of your restaurant with real-time data on every transaction, staff action, and customer interaction.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, text: "Real-time Sales Tracking" },
                { icon: Download, text: "Audit-Ready PDF Exports" },
                { icon: Mail, text: "Auto-EOD Email Reports" },
                { icon: ShieldCheck, text: "Taxation (GST) Compliance" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-50">
                  <item.icon size={20} className="text-orange-500" />
                  <span className="text-slate-700 font-semibold text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Section 2: AI Analytics */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={BarChart3} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              AI-Driven <span className="text-orange-500">Strategic Analytics</span>
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                <p className="text-slate-900 font-bold mb-3 flex items-center gap-2">
                  <PieChart className="text-orange-500" />
                  Predictive Sales Forecasting
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Leverage the power of AI to analyze historical data and predict future sales trends, helping you optimize staff schedules and inventory levels.
                </p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                <p className="text-slate-900 font-bold mb-3 flex items-center gap-2">
                  <TrendingUp className="text-orange-500" />
                  Profit Margin Deep Dives
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Understand exactly where your profit is coming from. Identify high-margin items and optimize your menu for maximum growth.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_50%)]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Stop Guessing, <span className="text-orange-500">Start Growing</span></h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Unlock the full potential of your restaurant with data that tells a story. Join thousands of owners making smarter decisions with RESTOSOFTIN.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group">
                Schedule a Demo
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-2xl font-bold transition-all border border-white/10 backdrop-blur-sm">
                View Sample Reports
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
