import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Hero } from '../../components/landing/Hero';
import { Stats } from '../../components/landing/Stats';
import { Features } from '../../components/landing/Features';
import { Testimonials } from '../../components/landing/Testimonials';
import { Pricing } from '../../components/landing/Pricing';

// Assets
import billingImg from '../../assets/landing/billing.png';
import inventoryImg from '../../assets/landing/inventory.png';
import orderImg from '../../assets/landing/order.png';

const DetailedFeature = ({ title, description, image, reversed }) => (
  <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 py-20`}>
    <motion.div 
      initial={{ opacity: 0, x: reversed ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex-1"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{title}</h2>
      <p className="text-lg text-slate-600 leading-relaxed mb-8">{description}</p>
    </motion.div>
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex-1"
    >
      <div className="relative group">
        <div className="absolute -inset-4 bg-orange-500/10 rounded-[2rem] blur-2xl group-hover:bg-orange-500/20 transition-colors"></div>
        <img 
          src={image} 
          alt={title} 
          className="relative w-full rounded-[2rem] shadow-2xl border border-slate-100"
        />
      </div>
    </motion.div>
  </div>
);

export const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Stats />

      {/* Services/Features Detail Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-orange-500 font-semibold tracking-wide uppercase text-sm mb-3">Our Services</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Complete Solution for Your Restaurant</h3>
            <p className="text-lg text-slate-600">
              From billing to reports, our software handles every part of your restaurant operations with precision and ease.
            </p>
          </div>

          <DetailedFeature 
            title="A Quick Billing Software"
            description="The billing software highly user-friendly design allows staff members to quickly and easily execute orders. It also provides an efficient and successful order completion procedure."
            image={billingImg}
          />

          <DetailedFeature 
            title="Simplify Your Restaurant Inventory"
            description="Boost your restaurant business with RESTOSOFTIN, the restaurant software that offers item-wise auto deduction, real-time low-stock alerts, and insightful day-end inventory reports for perfect inventory management."
            image={inventoryImg}
            reversed
          />

          <DetailedFeature 
            title="Transform Your Order Management"
            description="Orders can be accepted, managed, prepared, collected, and analyzed from a user-friendly screen. Enjoy a simplified experience that makes every step of the procedure easy to understand, increasing productivity."
            image={orderImg}
          />
        </div>
      </section>

      <Features />
      <Testimonials />
      <Pricing />

      {/* Final CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8">
            Ready to Transform Your <span className="text-orange-500">Restaurant?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Join 500+ restaurants that are already growing with RestosoftIN. Start your 14-day free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full text-lg font-bold transition-all shadow-lg shadow-orange-500/30 hover:-translate-y-1">
              Get Started for Free
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-4 rounded-full text-lg font-bold transition-all backdrop-blur-sm">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
