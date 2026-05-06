import React from 'react';
import { LayoutGrid, Zap, Filter, BarChart4, Ticket, Calendar, CheckCircle2, ArrowRight, MonitorSmartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { FeatureLayout } from '../../../components/landing/FeatureLayout';
import menuImg from '../../../assets/pos/menu.png';

export const Menu = () => {
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
        icon={LayoutGrid}
        image={menuImg}
        subtitle="Restaurant Menu Management Software"
        title="Easily Manage Menus with RESTOSOFTIN"
        description="At RESTOSOFTIN, we recognize the difficulties that come with managing a restaurant’s menu. Our Restaurant Menu Management Software simplifies the process by allowing you to edit, evaluate, and optimize your menu in real time."
        features={[
          "Track Menu Item Profitability",
          "Real-time Price Updates Across All Platforms",
          "Easy Menu Categorization",
          "Add-on & Modifier Management",
          "Visual Menu Designer for POS"
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
            Optimize Your Offerings with Advanced Menu Control
          </motion.h2>
        </motion.div>

        {/* Section 1: Real-Time Updates */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={Zap} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Instant <span className="text-orange-500">Real-Time Updates</span>
            </h2>
            <ul className="space-y-4">
              {[
                "Ensure customers see the latest menu updates instantly.",
                "New items or special prices are shown in real-time.",
                "Updates reflect across POS and online ordering.",
                "Prevent errors and ensure consistency for all diners."
              ].map((text, idx) => (
                <li key={idx} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-50">
                  <div className="mt-1 bg-orange-500 rounded-full p-1 h-fit">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <span className="text-slate-600 font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Section 2: Multi-Device Access */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={MonitorSmartphone} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Multi-Device <span className="text-orange-500">Access</span>
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Manage your menu anytime, anywhere with Restaurant menu management on any device. Easily update product details with a few clicks.
            </p>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  Track site statistics and performance quickly
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  Monitor and manage stock levels without hassle
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Section 3: Categorization */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={Filter} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Smart <span className="text-orange-500">Categorization</span> & Filters
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {["Breakfast", "Lunch", "Dinner", "Beverages", "Desserts", "Combos"].map(cat => (
                <div key={cat} className="px-6 py-3 bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  {cat}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section 4: Menu Analysis */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={BarChart4} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Detailed <span className="text-orange-500">Menu Analysis</span>
            </h2>
            <div className="space-y-4">
              {[
                "Identify best-selling items with analysis tools.",
                "Monitor popular dishes and profit margins.",
                "Make data-driven decisions to improve your menu.",
                "Use real-time analytics to promote or remove items.",
                "Increase customer satisfaction and profitability."
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <ArrowRight size={18} className="text-orange-500" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section 5: Promotions */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={Ticket} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Powerful <span className="text-orange-500">Promotions</span> & Discounts
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Easily design and manage promotions with RESTOSOFTIN. Create offers like happy hours or seasonal specials and track them across multiple platforms.
            </p>
            <div className="bg-orange-500 p-8 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-orange-200">
              <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12">
                <Ticket size={120} />
              </div>
              <p className="text-lg font-bold mb-2">Maximize Your Reach</p>
              <p className="text-orange-50">Maintain consistency in both in-house and online menus effortlessly.</p>
            </div>
          </motion.div>
        </div>

        {/* Section 6: Seasonal Planning */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={Calendar} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Seasonal <span className="text-orange-500">Menu Planning</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Plan Ahead", text: "Design seasonal event menus with ease." },
                { title: "Daily Freshness", text: "Update menus daily for variety." },
                { title: "Smooth Transitions", text: "Plan changes in advance for execution." },
                { title: "Holiday Specials", text: "Organize holiday-themed menus." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-bold text-slate-900 mb-1">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
