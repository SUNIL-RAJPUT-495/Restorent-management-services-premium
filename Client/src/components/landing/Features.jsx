import React from 'react';
import { Wine, Coffee, Zap, IceCream, Store, Croissant, Beer } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Wine className="w-8 h-8 text-rose-500" />,
    title: 'Fine–Dine',
    description: 'Fine–dining restaurants require careful attention to detail and great service. Our Restaurant Management Software allows you to manage complex menus, optimize table reservations, and customize client events, ensuring that every guest has an unforgettable dining experience.'
  },
  {
    icon: <Coffee className="w-8 h-8 text-amber-600" />,
    title: 'Cafe',
    description: 'Cafes succeed by establishing a pleasant environment for customers searching for a cup of coffee or a light meal. Our Restaurant Software Management allows you to effortlessly change daily specials, manage inventory for baked products, and track client preferences, all of which improve the casual dining experience.'
  },
  {
    icon: <Zap className="w-8 h-8 text-orange-500" />,
    title: 'Quick Service Restaurant (QSR)',
    description: 'In the hectic world of quick service restaurants, speed and efficiency are essential. Our Restaurant Management System allows you to process orders quickly, manage employee schedules, and optimize payment choices, ensuring that your customers receive their meals on time.'
  },
  {
    icon: <IceCream className="w-8 h-8 text-pink-500" />,
    title: 'Ice Cream Parlor',
    description: 'Ice cream Parlors provide a wide variety of flavours and additions. Our Restaurant Inventory Management tool allows you to keep track of your stock levels, manage supplies, and ensure that your best-selling tastes are always accessible, satisfying your guests.'
  },
  {
    icon: <Store className="w-8 h-8 text-blue-500" />,
    title: 'Food Court',
    description: 'Managing a food court with several businesses can be difficult. Our Restaurant Software Management gives you the tools you need to manage many counters, track sales, and process payments efficiently, resulting in a clear and wonderful experience for your guests.'
  },
  {
    icon: <Croissant className="w-8 h-8 text-yellow-600" />,
    title: 'Bakery',
    description: 'Bakeries demand strict commercial accountability standards, as well as manageable production and stock schedules. Our Restaurant Management Software will assist you in addressing issues such as supplying the necessary materials, selling baked goods, and meeting the needs of your customers while minimizing waste.'
  },
  {
    icon: <Beer className="w-8 h-8 text-emerald-500" />,
    title: 'Bar & Brewery',
    description: 'Bars and breweries demand strict commercial accountability standards, as well as manageable production and stock schedules. Our Restaurant Management Software will assist you in addressing issues such as supplying the necessary materials, selling beverages, and meeting the needs of your customers while minimizing waste.'
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4">Features of RestosoftIN</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Single Software Offering Multiple Features</h3>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            RESTOSOFT IN provides a complete Restaurant Management System that helps simplify operations in all types of restaurants. Our easy-to-use Restaurant Management Software includes a Smart Billing System for quick, accurate transactions, customized Menu Management for simple revisions, and thorough Reports for informed decision-making. 
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            With automated Inventory Tracking, you can keep track of your supplies and easily handle table reservations. With our Restaurant Software Management, you can increase customer loyalty through specialized programs and easily manage many locations. RESTOSOFT IN can help you transform your restaurant’s operations and give great service.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800">Multiple Integrations, Single Dashboard</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h4>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
