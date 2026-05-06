import React from 'react';

export const Pos = () => {
  return (<>
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[60vh]">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Best Restaurant Software
        For Billing, Orders,Inventory & Reports
      </h1>
      <p className="text-lg text-slate-600">
        Grow Faster, Save Time, Avoid Mistakes & Increase Your Profits 10X
      </p>
      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors shadow-md shadow-orange-500/30">Get A Free Demo</button>
    </div>
    <div className='pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[60vh]'>
      <div>
        <h1 className='text-4xl font-extrabold text-slate-900 mb-6'>Our Services</h1>
        <p className='text-lg text-slate-600'>From billing to reports, our software handles every part of your restaurant.</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 align-items-center'>
          <div className='bg-white h-96 rounded-lg border border-slate-200 p-4 shadow-md shadow-slate-200/50 w-90 h-90'> 
            <img src="/images/billing.png" alt="Billing" className='w-full h-full object-cover' /></div>
          <div>
            <h2 className='text-2xl font-extrabold text-slate-900 mb-6'>A Quick Billing Software</h2>
            <p className='text-lg text-slate-600'>The billing software highly user-friendly design allows staff members to quickly and easily execute orders. It also provides an efficient and successful order completion procedure.
            </p>
            <button className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors shadow-md shadow-orange-500/30'>Explore all features</button>
          </div>
        </div>
      </div>
    </div>
  </>


  );
};
