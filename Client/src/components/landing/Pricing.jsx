import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../../common/SummaryApi';
import AxiosSuperAdmin from '../../utils/axiosSuperAdmin';

export const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handlePlanSelect = (plan) => {
    navigate('/register-plan', { state: { selectedPlan: plan } });
  };

  const getPlan = async () => {
    try {
      const response = await AxiosSuperAdmin({
        url: SummaryApi.getSaasPlans.url,
        method: SummaryApi.getSaasPlans.method,
      });
      if (response.data.success && response.status === 200) {
        setPlans(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlan();
  }, []);

  const formatDuration = (val, unit) => {
    if (val === 0) return 'Trial';
    const singularUnit = unit.endsWith('s') ? unit.slice(0, -1) : unit;
    return `${val} ${val === 1 ? singularUnit : unit}`;
  };

  if (loading) {
    return (
      <section id="pricing" className="py-24 bg-white flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-orange-500 font-semibold tracking-wide uppercase text-sm mb-3">Pricing Plans</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h3>
          <p className="text-lg text-slate-600">
            No hidden fees. No surprise charges. Choose the plan that best fits your restaurant's size and needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 border ${
                plan.isPopular ? 'border-orange-500 shadow-xl shadow-orange-500/10' : 'border-slate-200 shadow-sm'
              } flex flex-col`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide shadow-md">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h4>
                <p className="text-slate-500 text-sm h-10 line-clamp-2">{plan.description}</p>
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-slate-900">₹{plan.price}</span>
                <span className="text-slate-500 ml-2">/ {formatDuration(plan.durationValue, plan.durationUnit)}</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 shrink-0" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handlePlanSelect(plan)}
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
                  plan.isPopular 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                }`}
              >
                {plan.price === 0 ? 'Start Free Trial' : 'Choose Plan'}
              </button>
            </motion.div>
          ))}
          
          {plans.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500">No pricing plans available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

