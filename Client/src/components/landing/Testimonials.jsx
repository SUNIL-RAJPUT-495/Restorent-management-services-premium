import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Owner, The Spice Garden',
    content: 'RestosoftIN has completely transformed how we handle our billing and inventory. The real-time alerts are a lifesaver!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=rajesh'
  },
  {
    name: 'Priya Sharma',
    role: 'Manager, Cafe Delight',
    content: 'The user interface is so intuitive. Our staff was able to pick it up in less than a day. Highly recommended!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=priya'
  },
  {
    name: 'Amit Patel',
    role: 'Chef, Royal Dine',
    content: 'The KDS (Kitchen Display System) is a game changer. No more lost paper tickets, and the kitchen runs much smoother now.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=amit'
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-orange-500 font-semibold tracking-wide uppercase text-sm mb-3">Testimonials</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Real Stories from Our Happy Clients</h3>
          <p className="text-lg text-slate-600">
            Join hundreds of successful restaurants that have scaled their business with our management software.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-slate-700 italic mb-6">"{testimonial.content}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
