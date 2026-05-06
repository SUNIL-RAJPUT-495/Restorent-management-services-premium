import React from 'react';
import { Wine, Coffee, Zap, IceCream, Store, Croissant, Beer, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Assets
import finedineImg from '../../assets/landing/finedine.png';
import cafeImg from '../../assets/landing/cafe.png';
import qsrImg from '../../assets/landing/qsr.png';
import icecreamImg from '../../assets/landing/icecream.png';
import bakeryImg from '../../assets/landing/bakery.png';
import barImg from '../../assets/landing/bar.png';

const features = [
  {
    icon: <Wine className="w-8 h-8 text-rose-500" />,
    title: 'Fine–Dine',
    description: 'Fine–dining restaurants require careful attention to detail and great service. Our Restaurant Management Software allows you to manage complex menus, optimize table reservations, and customize client events, ensuring that every guest has an unforgettable dining experience.',
    image: finedineImg,
    benefits: ['Advanced Reservation System', 'Customizable Floor Plans', 'Guest Preference Tracking']
  },
  {
    icon: <Coffee className="w-8 h-8 text-amber-600" />,
    title: 'Cafe',
    description: 'Cafes succeed by establishing a pleasant environment for customers searching for a cup of coffee or a light meal. Our Restaurant Software Management allows you to effortlessly change daily specials, manage inventory for baked products, and track client preferences.',
    image: cafeImg,
    benefits: ['Quick Order Processing', 'Loyalty Program Integration', 'Inventory for Baked Goods']
  },
  {
    icon: <Zap className="w-8 h-8 text-orange-500" />,
    title: 'Quick Service Restaurant (QSR)',
    description: 'In the hectic world of quick service restaurants, speed and efficiency are essential. Our Restaurant Management System allows you to process orders quickly, manage employee schedules, and optimize payment choices.',
    image: qsrImg,
    benefits: ['Self-Service Kiosks', 'Kitchen Display System (KDS)', 'Real-time Order Status']
  },
  {
    icon: <IceCream className="w-8 h-8 text-pink-500" />,
    title: 'Ice Cream Parlor',
    description: 'Ice cream Parlors provide a wide variety of flavours and additions. Our Restaurant Inventory Management tool allows you to keep track of your stock levels, manage supplies, and ensure that your best-selling tastes are always accessible.',
    image: icecreamImg,
    benefits: ['Flavor/Topping Tracking', 'Seasonal Menu Management', 'Bulk Order Handling']
  },
  {
    icon: <Croissant className="w-8 h-8 text-yellow-600" />,
    title: 'Bakery',
    description: 'Bakeries demand strict commercial accountability standards, as well as manageable production and stock schedules. Our Restaurant Management Software will assist you in addressing issues such as supplying the necessary materials and selling baked goods.',
    image: bakeryImg,
    benefits: ['Recipe Management', 'Waste Tracking', 'Production Scheduling']
  },
  {
    icon: <Beer className="w-8 h-8 text-emerald-500" />,
    title: 'Bar & Brewery',
    description: 'Bars and breweries demand strict commercial accountability standards, as well as manageable production and stock schedules. Our Restaurant Management Software will assist you in addressing issues such as supplying materials and selling beverages.',
    image: barImg,
    benefits: ['Keg/Draft Tracking', 'Happy Hour Automation', 'Age Verification Tools']
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <h2 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4">Features of RestosoftIN</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8">Single Software Offering Multiple Features</h3>
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            RESTOSOFT IN provides a complete Restaurant Management System that helps simplify operations in all types of restaurants.
          </p>
        </div>

        {/* Feature Sections */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}
            >
              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 !== 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex-1 w-full"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 bg-orange-500/10 rounded-[2.5rem] blur-2xl group-hover:bg-orange-500/20 transition-colors duration-500"></div>
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="relative w-full rounded-[2.5rem] shadow-2xl border border-white/50 backdrop-blur-sm object-cover aspect-[4/3]"
                  />
                  {/* Floating Icon Decoration */}
                  <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                    {feature.icon}
                  </div>
                </div>
              </motion.div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 !== 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className="flex-1 w-full"
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-6">
                  {feature.title}
                </div>
                <h4 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                  Tailored for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">{feature.title}</span> Success
                </h4>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {feature.description}
                </p>
                <ul className="grid sm:grid-cols-2 gap-4 mb-10">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                      <div className="bg-emerald-100 p-1 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
