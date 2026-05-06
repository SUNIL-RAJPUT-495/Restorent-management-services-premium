import React, { useEffect, useMemo, useState } from "react";
import { Loader2, Search, Mail, Phone, User, MessageSquare, Building2, MapPin, Tag } from "lucide-react";
import AxiosSuperAdmin from "../../utils/axiosSuperAdmin";
import SummaryApi from "../../common/SummaryApi";

const LeadManage = () => {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await AxiosSuperAdmin({
        url: SummaryApi.getAllLeads.url,
        method: SummaryApi.getAllLeads.method,
      });

      if (response.data.success) {
        setLeads(response.data.leads || []);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return leads;
    return leads.filter((lead) =>
      [
        lead.name, 
        lead.email, 
        lead.phone, 
        lead.restaurantName, 
        lead.city, 
        lead.state, 
        lead.outletType,
        lead.status
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [leads, searchTerm]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
        <p className="text-sm text-slate-500">Leads from website popup and contact form will be displayed here</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, restaurant, city..."
              className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-orange-500"
            />
          </div>
          <button
            onClick={fetchLeads}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-14">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-14 text-center text-sm text-slate-500">No leads found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Name & Contact</th>
                  <th className="px-4 py-3">Restaurant Details</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead._id} className="border-b border-slate-100 text-sm hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <User className="h-4 w-4 text-slate-400" />
                          {lead.name}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 font-semibold text-slate-800">
                          <Building2 className="h-4 w-4 text-orange-400" />
                          {lead.restaurantName || "—"}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                            {lead.outletType || "General"}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500 italic">
                            {lead.restaurantStatus || "—"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span className="capitalize">{lead.city || "—"}</span>
                        {lead.state && <span className="text-slate-400">,</span>}
                        <span className="uppercase text-xs font-bold text-slate-400">{lead.state || ""}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        lead.status === 'NEW' ? 'bg-blue-100 text-blue-700' :
                        lead.status === 'CONVERTED' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="max-w-[200px] truncate text-slate-500 text-xs" title={lead.message}>
                        {lead.message || "No message"}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
                      <br />
                      {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadManage;
