import React, { useState } from "react";
import axios from "axios";
import SummaryApi from "../../common/SummaryApi";
import { X } from "lucide-react";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", 
  "Lakshadweep", "Puducherry"
];

const LeadPopup = ({ open, onClose, onSubmitted }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    restaurantName: "",
    restaurantStatus: "",
    outletType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
        onSubmitted();
      } else {
        setError("Unable to submit lead. Please try again.");
      }
    } catch (submitError) {
      setError(submitError?.response?.data?.message || "Unable to submit lead. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6">
      <div className="w-full max-w-xl rounded-[2rem] bg-white p-5 sm:p-8 shadow-2xl relative max-h-full overflow-y-auto custom-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-600 transition-colors p-2 z-10 bg-slate-50 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">Get Your Free Demo</h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 px-4">
            Book a quick setup call for your restaurant.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name *"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-slate-50/50"
            />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address *"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-slate-50/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              placeholder="Phone Number *"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-slate-50/50"
            />
            <input
              type="text"
              name="restaurantName"
              required
              value={formData.restaurantName}
              onChange={handleChange}
              placeholder="Restaurant Name *"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-slate-50/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <select
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white"
            >
              <option value="" disabled>Select State *</option>
              {indianStates.map(state => (
                <option key={state} value={state.toLowerCase()}>{state}</option>
              ))}
            </select>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              placeholder="City *"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-slate-50/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <select
              name="restaurantStatus"
              required
              value={formData.restaurantStatus}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white"
            >
              <option value="" disabled>Restaurant Status *</option>
              <option value="open">Already Open</option>
              <option value="opening_soon">Opening Soon</option>
              <option value="planning">Just Planning</option>
            </select>
            <select
              name="outletType"
              required
              value={formData.outletType}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white"
            >
              <option value="" disabled>Outlet Type *</option>
              <option value="fine_dine">Fine-Dine</option>
              <option value="cafe">Cafe</option>
              <option value="qsr">QSR</option>
              <option value="ice_cream">Ice Cream Parlor</option>
              <option value="bakery">Bakery</option>
              <option value="bar_brewery">Bar & Brewery</option>
            </select>
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message (optional)"
            rows={2}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none bg-slate-50/50"
          />

          {error && <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-orange-500 py-3 sm:py-4 font-bold text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-500/40 transition-all disabled:opacity-60 text-sm sm:text-base active:scale-[0.98]"
          >
            {loading ? "Submitting..." : "Book My Free Demo"}
          </button>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .custom-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}} />
    </div>
  );
};

export default LeadPopup;
