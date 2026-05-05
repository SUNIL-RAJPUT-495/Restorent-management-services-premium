import React from 'react';
import { Utensils, Globe, MessageCircle, Share2, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Restro<span className="text-orange-500">Suite</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The all-in-one restaurant management software designed to simplify your operations, manage staff, and increase revenue.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><MessageCircle className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#features" className="hover:text-orange-500 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-orange-500 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">KDS System</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Staff Roles</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <a href="mailto:support@restrosuite.com" className="hover:text-white transition-colors">support@restrosuite.com</a>
              </li>
              <li>1-800-RESTRO (737876)</li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} RestroSuite. All rights reserved.</p>
          <p>Made with ❤️ for restaurants.</p>
        </div>
      </div>
    </footer>
  );
};
