import React, { useState, useEffect } from 'react';
import { Search, Filter, Mail, Phone, MapPin, MoreVertical, Loader2, User, Globe, Trash2, ShieldCheck, ShieldX } from 'lucide-react';
import AxiosSuperAdmin from '../../utils/axiosSuperAdmin';
import SummaryApi from '../../common/SummaryApi';

const TenantManage = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await AxiosSuperAdmin({
        url: SummaryApi.getAllRestaurants.url,
        method: SummaryApi.getAllRestaurants.method
      });

      if (response.data.success) {
        setRestaurants(response.data.restaurants);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.ownerName && r.ownerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Restaurant Management</h1>
        <p className="text-slate-500 text-sm">View and manage all restaurants registered on your platform.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search restaurants, owners, or emails..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                <Filter className="w-4 h-4" />
                Filter
            </button>
            <button 
              onClick={fetchRestaurants}
              className="p-2.5 border border-slate-200 bg-white rounded-xl text-slate-600 hover:text-orange-500 transition-all shadow-sm"
            >
              <Globe className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                <p className="text-slate-500 font-medium">Fetching restaurant records...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Restaurant Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Subscription</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Expiry</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredRestaurants.map((resto, i) => (
                  <tr key={resto._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center font-bold text-orange-500 border border-orange-100 uppercase text-lg shadow-sm">
                          {resto.name.charAt(0)}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{resto.name}</p>
                          <div className="flex flex-col gap-1">
                            <p className="text-[11px] text-slate-500 flex items-center gap-1.5"><User className="w-3 h-3" /> {resto.ownerName || 'N/A'}</p>
                            <p className="text-[11px] text-slate-500 flex items-center gap-1.5"><Mail className="w-3 h-3" /> {resto.email}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900">{resto.subscription?.plan || 'Free Trial'}</p>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1.5 line-clamp-1 max-w-[200px]">
                          <MapPin className="w-3 h-3 text-slate-400" /> {resto.address}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600 font-bold">
                        {resto.subscription?.expiresAt ? new Date(resto.subscription.expiresAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        }) : 'N/A'}
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium">Joined: {new Date(resto.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider w-fit ${
                          resto.isActive 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-rose-100 text-rose-600'
                        }`}>
                          {resto.isActive ? <ShieldCheck className="w-3 h-3" /> : <ShieldX className="w-3 h-3" />}
                          {resto.isActive ? 'Active' : 'Suspended'}
                        </span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border w-fit ${
                            resto.subscription?.status === 'active' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                            {resto.subscription?.status?.toUpperCase() || 'TRIAL'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="View Details">
                            <Globe className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Delete Restaurant">
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                            <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {!loading && filteredRestaurants.length === 0 && (
            <div className="text-center py-20">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-slate-200">
                    <Search className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-slate-900 font-bold">No restaurants found</h3>
                <p className="text-slate-500 text-sm">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
        
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
            <p>Showing {filteredRestaurants.length} of {restaurants.length} total restaurants</p>
            <div className="flex gap-4">
                <p className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online</p>
                <p className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Subscribed</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TenantManage;

