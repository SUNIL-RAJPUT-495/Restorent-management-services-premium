import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import maxresdefault from '../../assets/aboutus/maxresdefault.jpg';
import restaurant from '../../assets/aboutus/Restaurant-1080x600.jpg';

export const About = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col lg:flex-row justify-between items-center gap-12"
        >
          <div className='w-full lg:w-1/2'>
            <motion.h2 variants={itemVariants} className='text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight'>
              We are creating the <br/>
              <span className='text-orange-500'>Future of Restaurants</span> 
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-8 leading-relaxed">
              At <span className="font-bold text-slate-900">RESTOSOFTIN</span>, we use advanced technology to streamline restaurant management. Our software simplifies billing, order handling, inventory, and staff management, ensuring secure and smoother operations. Our goal is to assist restaurant owners in increasing productivity and improving service quality.
            </motion.p>
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-orange-500/30'
            >
              Get A Free Demo
            </motion.button>
          </div>
          <motion.div 
            variants={itemVariants}
            className='w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 border-4 border-white'
          >
            <img src={maxresdefault} alt="About Hero" className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-700' />
          </motion.div>
        </motion.div>
      </section>

      {/* Company Section */}
      <section className="py-20 bg-white">
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12"
          >
            <motion.div variants={itemVariants} className='w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/20 border-4 border-orange-50'>
              <img src={restaurant} alt="Restaurant Management" className="w-full h-auto" />
            </motion.div>
            <div className='w-full lg:w-1/2'>
              <motion.div variants={itemVariants} className="flex items-center gap-2 text-orange-500 font-bold mb-4">
                <Award size={24} />
                <span className="uppercase tracking-widest text-sm">About Our Company</span>
              </motion.div>
              <motion.h2 variants={itemVariants} className='text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6'>
                Leading the Digital <br/>Transformation in Dining
              </motion.h2>
              <motion.p variants={itemVariants} className='text-lg text-slate-600 mb-6'>
                <span className='text-orange-500 font-bold'>Ashtrinox Technology Solutions</span> proudly presents RESTOSOFTIN, our flagship restaurant management software led by CEO Mr. Vinay Angalakurtthi.
              </motion.p>
              <motion.p variants={itemVariants} className='text-lg text-slate-600 leading-relaxed'>
                With a focus on digital excellence, RESTOSOFTIN provides a complete ecosystem that helps owners manage order flow, customized solutions for fine dining and QSRs, and robust administrative controls. We ensure your restaurant runs successfully and dominates the global market.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Mission Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className='group p-10 rounded-3xl bg-white border border-slate-100 shadow-xl hover:bg-orange-500 transition-all duration-500 relative overflow-hidden'
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Target size={120} className="text-slate-900 group-hover:text-white" />
            </div>
            <div className='bg-orange-100 p-4 rounded-2xl w-fit mb-6 group-hover:bg-white/20 transition-colors'>
              <Target className='text-orange-600 group-hover:text-white' size={32} />
            </div>
            <h1 className='text-2xl font-bold text-slate-900 group-hover:text-white mb-4 transition-colors'>OUR MISSION</h1>
            <p className='text-slate-600 group-hover:text-white/90 leading-relaxed transition-colors'>
              Our company is dedicated to helping clients grow their businesses by providing high-quality development services, reliable solutions, and excellent support. We provide restaurant software management that adds value and keeps our customers ahead of the competition.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className='group p-10 rounded-3xl bg-white border border-slate-100 shadow-xl hover:bg-orange-500 transition-all duration-500 relative overflow-hidden'
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Eye size={120} className="text-slate-900 group-hover:text-white" />
            </div>
            <div className='bg-orange-100 p-4 rounded-2xl w-fit mb-6 group-hover:bg-white/20 transition-colors'>
              <Eye className='text-orange-600 group-hover:text-white' size={32} />
            </div>
            <h1 className='text-2xl font-bold text-slate-900 group-hover:text-white mb-4 transition-colors'>OUR VISION</h1>
            <p className='text-slate-600 group-hover:text-white/90 leading-relaxed transition-colors'>
              The team at RESTOSOFTIN is dedicated not only to the software but also to reliable customer service. With an innovative, expert, and cost-effective team, we provide small and medium businesses with the perfect tools for sustainable growth.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
