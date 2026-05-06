import React from 'react';
import { 
  UtensilsCrossed, 
  Layout, 
  CalendarCheck, 
  Activity, 
  Utensils, 
  Puzzle, 
  CheckCircle2, 
  ArrowRight, 
  CreditCard, 
  Users, 
  ShieldCheck, 
  Flame,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FeatureLayout } from '../../../components/landing/FeatureLayout';
import finedinerImg from '../../../assets/pos/finediner.png';

export const FineDiner = () => {
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
        icon={UtensilsCrossed}
        image={finedinerImg}
        subtitle="Fine Dining Solutions"
        title="Master the Art of Elegant Service with RESTOSOFTIN"
        description="Elevate your restaurant's atmosphere and efficiency. Our fine dining module is meticulously crafted to handle complex reservations, multi-course pacing, and personalized guest experiences."
        features={[
          "Interactive Floor Plan & Table Management",
          "Advanced Reservation & Guest List System",
          "Precision Course-by-Course Order Pacing",
          "VIP Guest Recognition & History",
          "Seamless Multi-Payment & Split Billing"
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
            A sophisticated ecosystem designed for the world's most demanding dining rooms
          </motion.h2>
        </motion.div>

        {/* Section 1: Interactive Floor Plan */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={Layout} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Precision <span className="text-orange-500">Floor Plan Management</span>
            </h2>
            <ul className="space-y-4">
              {[
                { title: "Visual Table Status", text: "Instantly see occupied, reserved, or cleaning statuses with a color-coded map." },
                { title: "Dynamic Seating", text: "Easily merge or split tables to accommodate large parties on the fly." },
                { title: "Server Assignments", text: "Assign specific zones to staff to ensure balanced workloads and superior service." },
                { title: "Optimization Insights", text: "Analyze table turnover rates to maximize your seating capacity." }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="mt-1 bg-orange-500 rounded-full p-1 h-fit">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">{item.title}:</span>
                    <span className="text-slate-600 block">{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Section 2: Smart Reservations */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={CalendarCheck} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Seamless <span className="text-orange-500">Reservation & Seating</span>
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Never miss a booking or overbook a section. Our integrated system connects online reservations directly to your floor plan for smooth guest arrivals.
            </p>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
              <p className="font-bold text-slate-900 mb-4">Why RESTOSOFTIN is different:</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  Automated guest SMS & Email reminders
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  Waitlist management with accurate time estimates
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Section 3: Fine Dining Billing */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={CreditCard} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Elegant <span className="text-orange-500">Billing & Payments</span>
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Handling complex checks shouldn't disrupt the guest's evening. Our billing system is designed for speed and flexibility, allowing for effortless split payments and custom gratuities.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Advanced Split Billing",
                "Service Charge Control",
                "Multi-Currency Support",
                "Digital Signature Capture"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm">
                  <CheckCircle2 size={18} className="text-orange-500" />
                  <span className="text-sm font-semibold text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section 4: Multi-Course Pacing */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={Activity} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Precision <span className="text-orange-500">Multi-Course Pacing</span>
            </h2>
            <ul className="space-y-6">
              <li className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-900 font-bold mb-2">Automated Course Fire (KOT)</p>
                <p className="text-slate-500 text-sm">Synchronize the kitchen and floor staff with timed alerts for every course.</p>
              </li>
              <li className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-900 font-bold mb-2">Dietary & Allergy Alerts</p>
                <p className="text-slate-500 text-sm">Critical guest information is prominently displayed on every order ticket.</p>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Section 5: VIP Guest Recognition */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={Users} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Personalized <span className="text-orange-500">Guest Recognition</span>
            </h2>
            <div className="space-y-6">
              <p className="text-slate-600 leading-relaxed">
                Build lasting relationships by remembering what matters. Access guest history, favorite tables, and wine preferences instantly at the table.
              </p>
              <div className="flex flex-wrap gap-3">
                {["History Tracking", "Preference Logs", "VIP Tagging", "Special Occasions"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section 6: Analytics & Insights */}
        <div className="bg-slate-900 rounded-[3rem] p-8 lg:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-[150px] opacity-20"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 leading-tight">
                High-End <span className="text-orange-500">Analytics & Sommelier</span> Tools
              </h2>
              <div className="space-y-6 text-slate-400">
                <p>Monitor high-value items, vintage inventory, and sommelier performance with granular reporting. Identify trends that drive your highest margins.</p>
                <p>From wine cellar management to server productivity, RESTOSOFTIN provides the clarity needed to maintain Michelin-level standards.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { title: "Wine Cellar", icon: Utensils },
                  { title: "Top Servers", icon: Flame },
                  { title: "Inventory", icon: ShieldCheck },
                  { title: "Reports", icon: BarChart3 }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex items-center gap-3">
                    <item.icon className="text-orange-500" size={20} />
                    <span className="font-bold text-xs">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl">
                <BarChart3 size={200} strokeWidth={1} className="text-orange-500 mx-auto opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="mt-32 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            An Integrated <span className="text-orange-500">Experience</span>
          </h2>
          <p className="text-slate-600 mb-12">
            Connect RESTOSOFTIN with your favorite reservation platforms, accounting software, and luxury loyalty programs.
          </p>
          <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all flex-wrap">
            <Puzzle size={48} />
            <Activity size={48} />
            <Layout size={48} />
            <CreditCard size={48} />
          </div>
        </div>
      </section>
    </div>
  );
};

