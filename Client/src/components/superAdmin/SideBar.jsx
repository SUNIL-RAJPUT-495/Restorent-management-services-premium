import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  FileText, 
  Settings, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';

const SideBar = ({ onClose }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/super-admin/dashboard', icon: LayoutDashboard },
    { name: 'Restaurants', path: '/super-admin/restaurants', icon: Users },
    { name: 'Plans', path: '/super-admin/plans', icon: CreditCard },
    { name: 'Blogs', path: '/super-admin/blogs', icon: FileText },
    {name: 'leads', path: '/super-admin/leads', icon: Users},
    {name: 'chat-bot', path: '/super-admin/chat-bot', icon: MessageSquare},
    { name: 'Settings', path: '/super-admin/settings', icon: Settings },
  ];


  
  return (
    <div className="w-64 h-full bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 relative">
      <div className="p-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-lg text-white">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">Admin<span className="text-orange-500">Panel</span></span>
        </div>
        
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-lg md:hidden text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-xl transition-all group ${
                isActive 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-500'}`} />
                <span className="font-medium">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all text-slate-400 group">
          <LogOut className="w-5 h-5 group-hover:text-red-500" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
