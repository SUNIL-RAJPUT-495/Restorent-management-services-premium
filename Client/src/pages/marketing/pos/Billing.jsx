import { CreditCard, CheckCircle2, Layout, Wallet, FileText, Settings, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { FeatureLayout } from '../../../components/landing/FeatureLayout';
import billingImg from '../../../assets/pos/billing.png';

export const Billing = () => {
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
        icon={CreditCard}
        image={billingImg}
        subtitle="Restaurant Billing Software"
        title="Experience 10x Faster Transactions with RESTOSOFTIN"
        description="RESTOSOFTIN offers advanced Restaurant Billing Software that can speed up your billing process by ten times. It is designed to improve efficiency and simplify payments for your restaurant."
        features={[
          "Quick split billing & multi-payment support",
          "GST & dynamic taxation compliance",
          "Integrated digital wallets & card payments",
          "Customizable receipt templates",
          "Offline billing support for uninterrupted service"
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
            A flexible restaurant billing software and POS system that meets all your restaurant needs
          </motion.h2>
        </motion.div>

        {/* Section 1: Order Management */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={CheckCircle2} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Making Customers Happy with Our <span className="text-orange-500">Effective Order Management</span>
            </h2>
            <ul className="space-y-4">
              {[
                { title: "Error-Free Billing", text: "Reduces manual mistakes by automatically calculating prices and taxes." },
                { title: "Real-Time Order Updates", text: "Tracks orders in the system, helping staff stay updated on progress." },
                { title: "Faster Billing Process", text: "Generates bills instantly, reducing customer wait times and improving satisfaction." },
                { title: "User-Friendly Interface", text: "Designed for ease of use, even during peak hours." }
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

        {/* Section 2: Table Management */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={Layout} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Quick and Simple <span className="text-orange-500">Table Management</span> for Fast Billing
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Managing tables in a busy restaurant can be tough. Common problems like overbooking and confusion with assignments are eliminated with our real-time updates.
            </p>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
              <p className="font-bold text-slate-900 mb-4">How RESTOSOFTIN Solves This:</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  Easy-to-use interface for real-time table management
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  Automatically updating table availability (occupied or free)
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Section 3: Payment Choices */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={Wallet} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Multiple <span className="text-orange-500">Payment Choices</span> for Easy and Flexible Transactions
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Handling multiple payment methods like cash, credit cards, and mobile money can slow down operations. We simplify this by supporting all major payment options seamlessly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Supports various methods",
                "Secure payment processing",
                "Detailed transaction records",
                "Instant confirmation"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm">
                  <CheckCircle2 size={18} className="text-orange-500" />
                  <span className="text-sm font-semibold text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section 4: Invoice Generation */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={FileText} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Better Customer Service Through <span className="text-orange-500">Quick Invoice Generation</span>
            </h2>
            <ul className="space-y-6">
              <li className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-900 font-bold mb-2">Quickly generating accurate invoices</p>
                <p className="text-slate-500 text-sm">Eliminate long wait times and improve the post-dining experience for your guests.</p>
              </li>
              <li className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-900 font-bold mb-2">Reducing manual errors</p>
                <p className="text-slate-500 text-sm">Automated calculations ensure that bills are always 100% correct.</p>
              </li>
              <li className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-900 font-bold mb-2">Tracking all sales</p>
                <p className="text-slate-500 text-sm">Every invoice is logged for easy record management and tax compliance.</p>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Section 5: Menu Customization */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={Settings} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Real-Time <span className="text-orange-500">Menu Customization</span> Software
            </h2>
            <div className="space-y-6">
              <p className="text-slate-600 leading-relaxed">
                Simply add, remove, or change menu items with a few clicks. Instantly update prices and descriptions to keep your menu current and matching your customers’ preferences.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Add/Remove Items", "Update Prices", "Custom Descriptions", "Seasonal Tags"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section 6: Sales & Analytics */}
        <div className="bg-slate-900 rounded-[3rem] p-8 lg:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-[150px] opacity-20"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 leading-tight">
                Managing Your <span className="text-orange-500">Sales And Analytics Reports</span> Effectively
              </h2>
              <div className="space-y-6 text-slate-400">
                <p>Automatically collects and organizes sales data for accurate reporting. Quickly identifies popular menu items and sales trends over time.</p>
                <p>Provides clear insights to help you improve your menu and boost sales. With RESTOSOFTIN, you can understand your business better, plan smarter, and grow faster!</p>
              </div>
              <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all">View Sample Reports</button>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl">
                <BarChart3 size={200} strokeWidth={1} className="text-orange-500 mx-auto opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
