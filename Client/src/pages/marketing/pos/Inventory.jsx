import { Package, RefreshCw, PackageCheck, Soup, History, ClipboardCheck, MonitorSmartphone, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FeatureLayout } from '../../../components/landing/FeatureLayout';
import inventoryImg from '../../../assets/pos/inventory.png';

export const Inventory = () => {
  const navigate = useNavigate();

  const handleTrial = () => {
    navigate('/pricing');
  };
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
        icon={Package}
        image={inventoryImg}
        subtitle="Inventory Management Software"
        title="Easily Maintain Your Stocks with RESTOSOFTIN"
        description="RESTOSOFTIN – Your ultimate partner for managing entire restaurant inventory in just 15 minutes. Take control of your supplies and minimize wastage."
        features={[
          "Track Inventory in Real Time",
          "Automated Low Stock Alerts",
          "Recipe-based Consumption Tracking",
          "Vendor Management & Purchase Orders",
          "Waste Reduction Analytics"
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
            Enjoy Top Inventory Management with Our Simple POS Features
          </motion.h2>
        </motion.div>

        {/* Section 1: Stock Loading */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={RefreshCw} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Stock Loading for Better <span className="text-orange-500">Inventory Control</span>
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="mt-1 bg-orange-500 rounded-full p-1 h-fit">
                  <CheckCircle2 size={14} className="text-white" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Easily Update Stock</span>
                  <span className="text-slate-600">Quickly load and update your inventory with minimal effort using RESTOSOFTIN.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 bg-orange-500 rounded-full p-1 h-fit">
                  <CheckCircle2 size={14} className="text-white" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Accurate Records</span>
                  <span className="text-slate-600">Keep real-time updates to prevent errors and ensure precise management.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 bg-orange-500 rounded-full p-1 h-fit">
                  <CheckCircle2 size={14} className="text-white" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Efficient Entry</span>
                  <span className="text-slate-600">Reduce manual data entry time and speed up the stock-loading process.</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Section 2: Stock Availability */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={PackageCheck} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Improve Performance with Better <span className="text-orange-500">Stock Availability</span>
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100 hover:border-orange-200 transition-colors">
                <p className="font-bold text-slate-900 mb-2">Avoid Stock-outs</p>
                <p className="text-slate-600">Track inventory levels and prevent popular goods from running out.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100 hover:border-orange-200 transition-colors">
                <p className="font-bold text-slate-900 mb-2">Meet Customer Demands</p>
                <p className="text-slate-600">Keep important items in stock to ensure order fulfilment on schedule.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100 hover:border-orange-200 transition-colors">
                <p className="font-bold text-slate-900 mb-2">Increase Sales</p>
                <p className="text-slate-600">Maximize sales by having the proper stock on hand at all times.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section 3: Recipe Module */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={Soup} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Manage Recipes with <span className="text-orange-500">Our Recipe Module</span>
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Simplify the complex process of recipe management. Automatically link your menu items to your raw materials for perfect tracking.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Simplify Management",
                "Track Ingredient Usage",
                "Maintain Consistency",
                "Auto-Update Quantities"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-slate-700 font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section 4: Transactions */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={History} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Track All Your <span className="text-orange-500">Stock Transactions</span>
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white transition-colors">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                  <Package size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Monitor Purchases and Sales</p>
                  <p className="text-sm text-slate-500">Track all transactions like purchases, sales, and refunds in one place.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white transition-colors">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                  <RefreshCw size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Gain Movement Insights</p>
                  <p className="text-sm text-slate-500">See clear stock movement details to find areas for improvement.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white transition-colors">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                  <History size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Financial Linking</p>
                  <p className="text-sm text-slate-500">Link inventory to financial records for accurate profit and loss tracking.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Section 5: Stock Inspection */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <ImagePlaceholder icon={ClipboardCheck} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Stock Inspection for Better <span className="text-orange-500">Inventory Control</span>
            </h2>
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-orange-500" size={20} />
                  <span className="text-slate-700 font-medium">Regular Stock Audits for accurate records</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-orange-500" size={20} />
                  <span className="text-slate-700 font-medium">Minimize gaps between actual and recorded levels</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-orange-500" size={20} />
                  <span className="text-slate-700 font-medium">Ensure stock quality and avoid expiry wastage</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Section 6: Compatibility */}
        <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-[150px] opacity-20"></div>
          <div className="relative z-10">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="mb-8 flex justify-center">
              <MonitorSmartphone size={80} strokeWidth={1} className="text-orange-500" />
            </motion.div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Where does all this inventory work?</h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
              Our cloud-based system is designed to be accessible from anywhere, on any device.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Any OS", text: "Windows, macOS, Linux" },
                { title: "Any Hardware", text: "Touch screens & tablets" },
                { title: "Any Browser", text: "Chrome, Safari, Firefox" }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                  <p className="text-orange-500 font-bold text-xl mb-1">{item.title}</p>
                  <p className="text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>
            <button onClick={handleTrial} className="mt-12 bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 mx-auto group">
              Start Your Free Trial
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
