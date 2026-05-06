import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Restaurants Trust Us', value: '500+' },
  { label: 'Daily Orders Processed', value: '50k+' },
  { label: 'Happy Customers', value: '1M+' },
  { label: 'Uptime Guarantee', value: '99.9%' },
];

export const Stats = () => {
  return (
    <section className="py-12 bg-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{stat.value}</div>
              <div className="text-orange-100 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
