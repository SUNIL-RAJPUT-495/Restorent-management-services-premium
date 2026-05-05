import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AxiosSuperAdmin from '../../utils/axiosSuperAdmin';
import SummaryApi from '../../common/SummaryApi';

const PlanManage = () => {
  // Custom CSS to hide scrollbars
  const scrollbarHideStyle = `
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    price: '',
    durationValue: '',
    durationUnit: 'months',
    features: [''],
    isPopular: false
  });

  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    try {
      const response = await AxiosSuperAdmin({
        url: SummaryApi.getSaasPlans.url,
        method: SummaryApi.getSaasPlans.method
      });
      if (response.data.success) {
        setPlans(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleAddFeature = () => {
    setNewPlan({ ...newPlan, features: [...newPlan.features, ''] });
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...newPlan.features];
    updatedFeatures[index] = value;
    setNewPlan({ ...newPlan, features: updatedFeatures });
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = newPlan.features.filter((_, i) => i !== index);
    setNewPlan({ ...newPlan, features: updatedFeatures });
  };

  const handleEdit = (plan) => {
    setIsEditing(true);
    setEditId(plan._id);
    setNewPlan({
      name: plan.name,
      description: plan.description,
      price: plan.price.toString(),
      durationValue: plan.durationValue,
      durationUnit: plan.durationUnit,
      features: plan.features,
      isPopular: plan.isPopular
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    
    try {
      const api = SummaryApi.deleteSaasPlan(id);
      const response = await AxiosSuperAdmin({
        url: api.url,
        method: api.method
      });
      if (response.data.success) {
        fetchPlans();
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...newPlan,
        price: parseFloat(newPlan.price.toString().replace(/[^\d.]/g, '')) || 0,
        active: true
      };

      let response;
      if (isEditing) {
        const api = SummaryApi.updateSaasPlan(editId);
        response = await AxiosSuperAdmin({
          url: api.url,
          method: api.method,
          data: payload
        });
      } else {
        response = await AxiosSuperAdmin({
          url: SummaryApi.createSaasPlan.url,
          method: SummaryApi.createSaasPlan.method,
          data: payload
        });
      }
      
      if (response.data.success) {
        fetchPlans();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error saving plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditId(null);
    setNewPlan({ name: '', description: '', price: '', durationValue: '', durationUnit: 'months', features: [''], isPopular: false });
  };

  const formatDuration = (val, unit) => {
    if (val === 0) return 'Trial';
    const singularUnit = unit.slice(0, -1); // remove 's'
    return `${val} ${val === 1 ? singularUnit : unit}`;
  };

  return (
    <div className="space-y-8 relative">
      <style>{scrollbarHideStyle}</style>
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Subscription Plans</h1>
          <p className="text-slate-500 text-sm">Manage and update your platform pricing plans.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20"
        >
          <Plus className="w-5 h-5" />
          Create New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, i) => (
          <div key={i} className={`bg-white rounded-3xl border ${plan.isPopular ? 'border-orange-500 ring-2 ring-orange-500/10' : 'border-slate-200'} overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all relative`}>
            <div className="p-8 border-b border-slate-100 flex-1 relative">
              {plan.isPopular && (
                <div className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 absolute -top-3 left-8 rounded-full flex items-center gap-1 shadow-lg shadow-orange-500/20 z-20">
                  <Star className="w-3 h-3 fill-current" />
                  Most Popular
                </div>
              )}
              
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                  Active
                </span>
                <div className="flex gap-1 -mr-2 -mt-2">
                  <button 
                    onClick={() => handleEdit(plan)}
                    className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(plan._id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
              <p className="text-slate-500 text-xs mb-4 line-clamp-2">{plan.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-slate-900">₹{plan.price}</span>
                <span className="text-slate-500 text-sm ml-1">
                  /{formatDuration(plan.durationValue, plan.durationUnit)}
                </span>
              </div>
              <ul className="space-y-4">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Create Plan Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-5xl rounded-2xl md:rounded-[32px] shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Form Section */}
              <div className="flex-1 p-5 md:p-8 overflow-y-auto no-scrollbar">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">{isEditing ? 'Update Plan' : 'Create New Plan'}</h2>
                  <button onClick={handleCloseModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-slate-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs md:text-sm font-bold text-slate-700 ml-1">Plan Name</label>
                      <input 
                        required
                        type="text" 
                        value={newPlan.name}
                        onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                        className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm font-medium"
                        placeholder="e.g. 6 Months Premium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs md:text-sm font-bold text-slate-700 ml-1">Price (numeric)</label>
                      <input 
                        required
                        type="text" 
                        value={newPlan.price}
                        onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                        className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm font-medium"
                        placeholder="e.g. 10499"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-bold text-slate-700 ml-1">Short Description</label>
                    <textarea 
                      required
                      value={newPlan.description}
                      onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                      className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm font-medium resize-none"
                      placeholder="Explain who this plan is for..."
                      rows="2"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs md:text-sm font-bold text-slate-700 ml-1">Duration</label>
                      <div className="flex gap-2">
                        <input 
                          required
                          type="number" 
                          value={newPlan.durationValue}
                          onChange={(e) => setNewPlan({...newPlan, durationValue: parseInt(e.target.value) || ''})}
                          className="flex-1 px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm font-medium"
                          placeholder="6"
                        />
                        <select 
                          value={newPlan.durationUnit}
                          onChange={(e) => setNewPlan({...newPlan, durationUnit: e.target.value})}
                          className="w-28 md:w-32 px-2 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-xs md:text-sm font-bold text-slate-700 cursor-pointer"
                        >
                          <option value="days">Days</option>
                          <option value="months">Months</option>
                          <option value="years">Years</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-end pb-1 md:ps-10">
                      <label className="flex items-center gap-3 cursor-pointer group bg-slate-50 p-3 rounded-xl border border-slate-200 w-full">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="sr-only" 
                            checked={newPlan.isPopular}
                            onChange={(e) => setNewPlan({...newPlan, isPopular: e.target.checked})}
                          />
                          <div className={`w-10 h-6 rounded-full transition-colors ${newPlan.isPopular ? 'bg-orange-500' : 'bg-slate-300'}`}></div>
                          <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${newPlan.isPopular ? 'translate-x-4' : 'translate-x-0'}`}></div>
                        </div>
                        <span className="text-sm font-bold text-slate-700">Mark as Most Popular</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-slate-700 ml-1">Plan Features</label>
                      <button 
                        type="button"
                        onClick={handleAddFeature}
                        className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Feature
                      </button>
                    </div>
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2 no-scrollbar">
                      {newPlan.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <input 
                            type="text" 
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-orange-500 transition-all"
                            placeholder="Describe feature..."
                          />
                          {newPlan.features.length > 1 && (
                            <button 
                              type="button"
                              onClick={() => handleRemoveFeature(index)}
                              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className={`flex-1 px-6 py-3 font-bold rounded-xl transition-all shadow-lg ${
                        loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20 text-white'
                      }`}
                    >
                      {loading ? (isEditing ? 'Updating...' : 'Publishing...') : (isEditing ? 'Update Plan' : 'Publish Plan')}
                    </button>
                  </div>
                </form>
              </div>

              {/* Preview Section - Responsive Hide */}
              <div className="hidden md:flex w-[380px] bg-slate-50 border-l border-slate-100 p-8 flex-col items-center justify-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Live Preview</p>
                
                <div className={`w-full bg-white rounded-3xl border ${newPlan.isPopular ? 'border-orange-500 ring-4 ring-orange-500/5' : 'border-slate-200'} overflow-hidden shadow-xl relative transition-all duration-500`}>
                  {newPlan.isPopular && (
                    <div className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 absolute top-4 right-4 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Most Popular
                    </div>
                  )}
                  <div className="p-8">
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-wider">Active</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-1 truncate">{newPlan.name || 'Plan Name'}</h3>
                    <p className="text-slate-500 text-[10px] font-medium mb-4 line-clamp-2 h-8">{newPlan.description || 'Plan description will appear here...'}</p>
                    <div className="mb-6">
                      <span className="text-3xl font-black text-slate-900">{newPlan.price || '₹0'}</span>
                      <span className="text-slate-500 text-xs font-bold ml-1">
                        /{formatDuration(newPlan.durationValue || 0, newPlan.durationUnit)}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {(newPlan.features[0] ? newPlan.features : ['Feature list will appear here', 'Another feature example']).map((feature, j) => (
                        <li key={j} className="flex items-start gap-3 text-xs text-slate-600 font-medium animate-in fade-in slide-in-from-left-2 duration-300">
                          <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-8 text-center text-xs text-slate-400 font-medium px-8 leading-relaxed">
                  This is exactly how your customers will see the plan on the pricing page.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanManage;
