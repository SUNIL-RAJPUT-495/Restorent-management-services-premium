import React, { useState } from 'react';
import axios from 'axios';
import SummaryApi from '../../common/SummaryApi';
import { CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    restaurantName: "",
    restaurantStatus: "",
    outletType: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios({
        url: SummaryApi.createLead.url,
        method: SummaryApi.createLead.method,
        data: formData,
      });

      if (response.data?.success) {
        setSuccess(true);
        setFormData({
          name: "", email: "", phone: "", state: "", city: "",
          restaurantName: "", restaurantStatus: "", outletType: "", message: ""
        });
      } else {
        setError("Unable to submit. Please try again.");
      }
    } catch (submitError) {
      setError(submitError?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section id="contact" className="py-24 bg-orange-500 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-[2rem] p-12 shadow-2xl flex flex-col items-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Thank You!</h2>
            <p className="text-lg text-slate-600 mb-8">Your details have been submitted successfully. Our team will contact you shortly.</p>
            <button 
              onClick={() => setSuccess(false)}
              className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold"
            >
              Back to Form
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-orange-500 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-400 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Connect with RESTOSOFTIN!</h2>
          <p className="text-xl text-orange-100">Simplify Your Restaurant Operations Today!</p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">State <span className="text-red-500">*</span></label>
                <select 
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white" 
                  required
                >
                  <option value="" disabled>Select State</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="delhi">Delhi</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="gujarat">Gujarat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">City <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  placeholder="Your City"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone <span className="text-red-500">*</span></label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 py-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500 font-medium">+91</span>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-r-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="10-digit number"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Restaurant Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  placeholder="The Grand Palace"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Restaurant Status <span className="text-red-500">*</span></label>
                <select 
                  name="restaurantStatus"
                  value={formData.restaurantStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white" 
                  required
                >
                  <option value="" disabled>Select Type</option>
                  <option value="open">Already Open</option>
                  <option value="opening_soon">Opening Soon</option>
                  <option value="planning">Just Planning</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Outlet Type <span className="text-red-500">*</span></label>
                <select 
                  name="outletType"
                  value={formData.outletType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white" 
                  required
                >
                  <option value="" disabled>Please Select</option>
                  <option value="fine_dine">Fine-Dine</option>
                  <option value="cafe">Cafe</option>
                  <option value="qsr">QSR</option>
                  <option value="ice_cream">Ice Cream Parlor</option>
                  <option value="bakery">Bakery</option>
                  <option value="bar_brewery">Bar & Brewery</option>
                </select>
              </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-slate-900/20 disabled:opacity-70"
              >
                {loading ? "Submitting..." : "Submit Details"}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </section>
  );
};
