import React from 'react';
import { Users, Lock, ShieldCheck, ShoppingBag, Edit3, Layout, UserCheck, BarChart2, Blocks, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FeatureLayout } from '../../../components/landing/FeatureLayout';
import employeeImg from '../../../assets/pos/employee.png';

export const Employee = () => {
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
        icon={Users}
        image={employeeImg}
        subtitle="Staff Management"
        title="Empower Your Team for Success"
        description="Streamline your workforce management with integrated scheduling, performance tracking, and role-based access controls. Keep your staff motivated and your operations smooth."
        features={[
          "Shift Scheduling & Attendance Tracking",
          "Role-Based Permissions & Security",
          "Staff Performance Leaderboards",
          "In-App Communication Tools",
          "Payroll & Commission Automation"
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
            Comprehensive Staff Control & Security
          </motion.h2>
        </motion.div>

        {/* Section 1: Customizable Permissions */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={Lock} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Customizable <span className="text-orange-500">Employee Permissions</span>
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our software offers fully customizable permissions to ensure complete control over staff access. Managers can assign specific tasks and data visibility to each employee, increasing security and simplifying operations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Role-based access", "Data visibility control", "Task assignment", "Secure logging"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm">
                  <ShieldCheck size={18} className="text-orange-500" />
                  <span className="text-sm font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section 2: Order Management Access */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={ShoppingBag} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Secure <span className="text-orange-500">Order Management</span> Access
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Managers can boost operations by assigning specific permissions based on roles. From order creation to real-time updates and tracking, ensure only authorized employees manage the process.
            </p>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  User-friendly access controls
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  Real-time updates and tracking
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Section 3: Menu Editing */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={Edit3} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Flexible <span className="text-orange-500">Menu Editing</span>
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Update menu items, prices, and categories in real time. Restosoft ensures a smooth, problem-free process that reflects instantly across all platforms.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Real-time Updates", "Price Adjustments", "Category Control"].map(tag => (
                <span key={tag} className="px-4 py-2 bg-orange-50 text-orange-600 text-xs font-bold rounded-full uppercase tracking-wider border border-orange-100">{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section 4: Table Management */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={Layout} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Smart <span className="text-orange-500">Table Management</span>
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Organize seating with real-time updates on table status. Staff can quickly assign tables, manage reservations, and optimize seating to reduce wait times.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {["Occupied", "Reserved", "Available", "Cleaning"].map(status => (
                <div key={status} className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm text-center font-bold text-slate-700 uppercase text-xs tracking-widest">
                  {status}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section 5: Performance Tracking */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={BarChart2} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Performance <span className="text-orange-500">Tracking & Monitoring</span>
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Effectively monitor employee performance with real-time tracking tools. Check shifts and productivity to ensure your team stays on track.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-50 shadow-sm">
                <CheckCircle2 className="text-orange-500 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900">Fair & Transparent Management</p>
                  <p className="text-sm text-slate-500">Identify areas for improvement while celebrating top performers.</p>
                </div>
              </li>
              <li className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-50 shadow-sm">
                <CheckCircle2 className="text-orange-500 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900">Real-time Shift Monitoring</p>
                  <p className="text-sm text-slate-500">Foster a positive work environment with clear performance reports.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Section 6: Integrations */}
        <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-[150px] opacity-20"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 leading-tight">
                Third-Party <span className="text-orange-500">App Integrations</span>
              </h2>
              <p className="text-slate-400 mb-10 max-w-xl">
                RESTOSOFTIN easily integrates with delivery, payment, and loyalty platforms to expand your options and boost services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold transition-all group">
                  Connect Apps
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-2xl font-bold transition-all border border-white/10">
                  View Market
                </button>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Delivery", icon: Blocks },
                  { title: "Payments", icon: UserCheck },
                  { title: "Loyalty", icon: Users },
                  { title: "Security", icon: Lock }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center gap-4">
                    <item.icon size={32} className="text-orange-500" />
                    <p className="font-bold">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
