import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Store, 
  CreditCard, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Loader2
} from 'lucide-react';
import AxiosSuperAdmin from '../../utils/axiosSuperAdmin';
import SummaryApi from '../../common/SummaryApi';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [stats, setStats] = useState([]);
  const [planDistribution, setPlanDistribution] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await AxiosSuperAdmin({
        url: SummaryApi.getAllRestaurants.url,
        method: SummaryApi.getAllRestaurants.method
      });

      if (response.data.success) {
        const data = response.data.restaurants;
        setRestaurants(data);
        processStats(data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const processStats = (data) => {
    // 1. Calculate General Stats
    const totalResto = data.length;
    
    // Only count as 'Active Subscription' if status is 'active' (excluding 'trial')
    const activeSub = data.filter(r => r.subscription?.status === 'active').length;
    const trialCount = data.filter(r => r.subscription?.status === 'trial').length;
    
    // Calculate revenue based on actual paid plans (placeholder logic until Transaction model is linked)
    // We can iterate and sum prices if we have them in the restaurant data
    let totalRevenue = 0;
    data.forEach(r => {
        if(r.subscription?.status === 'active') {
            // We'll use a default price if not stored, or better, we can assume a basic amount for now
            totalRevenue += 1999; 
        }
    });
    
    const newStats = [
      { label: 'Total Restaurants', value: totalResto.toString(), icon: Store, color: 'bg-blue-500', trend: '+100%', isPositive: true },
      { label: 'Active Subscriptions', value: activeSub.toString(), icon: CreditCard, color: 'bg-orange-500', trend: `+${activeSub}`, isPositive: true },
      { label: 'Free Trials', value: trialCount.toString(), icon: Users, color: 'bg-emerald-500', trend: `+${trialCount}`, isPositive: true },
      { label: 'Est. Monthly Revenue', value: "₹" + totalRevenue.toLocaleString(), icon: TrendingUp, color: 'bg-violet-500', trend: '+0%', isPositive: true },
    ];
    setStats(newStats);

    // 2. Calculate Plan Distribution
    const counts = {};
    data.forEach(r => {
      const plan = r.subscription?.plan || 'No Plan';
      counts[plan] = (counts[plan] || 0) + 1;
    });

    const colors = ['bg-blue-400', 'bg-orange-400', 'bg-violet-400', 'bg-emerald-400', 'bg-slate-300'];
    const distribution = Object.keys(counts).map((plan, i) => ({
      label: plan,
      count: counts[plan],
      percentage: Math.round((counts[plan] / totalResto) * 100),
      color: colors[i % colors.length]
    }));
    setPlanDistribution(distribution);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm">Welcome back! Here's what's happening with your platform today.</p>
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-lg border border-slate-100">
          Last Updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${stat.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.trend}
                {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              </div>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Recent Restaurants */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900">Recent Restaurants</h3>
            <button className="text-orange-500 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {restaurants.slice(0, 5).map((resto, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center font-bold text-orange-500 uppercase">
                    {resto.name.substring(0, 1)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{resto.name}</p>
                    <p className="text-xs text-slate-500">{new Date(resto.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    resto.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {resto.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 font-medium">{resto.subscription?.plan || 'Trial'}</span>
                </div>
              </div>
            ))}
            {restaurants.length === 0 && (
              <div className="text-center py-8 text-slate-500 text-sm italic">No restaurants registered yet.</div>
            )}
          </div>
        </div>

        {/* Subscription Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-6">Plan Distribution</h3>
          <div className="space-y-6">
            {planDistribution.map((plan, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{plan.label}</span>
                  <span className="font-bold text-slate-900">{plan.count} ({plan.percentage}%)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`${plan.color} h-full transition-all duration-1000 ease-out`} 
                    style={{ width: `${plan.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
            {planDistribution.length === 0 && (
              <div className="text-center py-8 text-slate-500 text-sm italic">No subscription data available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

