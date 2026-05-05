import React from 'react';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-orange-500 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-400 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Connect with RESTOSOFTIN!</h2>
          <p className="text-xl text-orange-100">Simplify Your Restaurant Operations Today!</p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl">
          <form className="space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* State */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">State <span className="text-red-500">*</span></label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white" required>
                  <option value="" disabled selected>Select State</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="delhi">Delhi</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="gujarat">Gujarat</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">City <span className="text-red-500">*</span></label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white" required>
                  <option value="" disabled selected>Select City</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="new_delhi">New Delhi</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="ahmedabad">Ahmedabad</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone <span className="text-red-500">*</span></label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 py-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500 font-medium">
                    +91
                  </span>
                  <input 
                    type="tel" 
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 rounded-r-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter 10-digit phone number"
                    required
                  />
                </div>
              </div>

              {/* Restaurant Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Restaurant Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="The Grand Palace"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Restaurant Status */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Restaurant Status <span className="text-red-500">*</span></label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white" required>
                  <option value="" disabled selected>Select Type</option>
                  <option value="open">Already Open</option>
                  <option value="opening_soon">Opening Soon</option>
                  <option value="planning">Just Planning</option>
                </select>
              </div>

              {/* Outlet Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Outlet Type <span className="text-red-500">*</span></label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white" required>
                  <option value="" disabled selected>Please Select</option>
                  <option value="fine_dine">Fine-Dine</option>
                  <option value="cafe">Cafe</option>
                  <option value="qsr">Quick Service Restaurant (QSR)</option>
                  <option value="ice_cream">Ice Cream Parlor</option>
                  <option value="food_court">Food Court</option>
                  <option value="bakery">Bakery</option>
                  <option value="bar_brewery">Bar & Brewery</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg py-4 rounded-xl transition-colors shadow-lg shadow-slate-900/20"
              >
                Submit Details
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </section>
  );
};
