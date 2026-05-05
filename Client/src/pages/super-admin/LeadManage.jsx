import React, { useEffect, useMemo, useState } from "react";
import { Loader2, Search, Mail, Phone, User, MessageSquare } from "lucide-react";
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
      [lead.name, lead.email, lead.phone, lead.message, lead.status]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [leads, searchTerm]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
        <p className="text-sm text-slate-500">Website popup se aaye hue leads yahan dikhte hain.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads..."
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
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead._id} className="border-b border-slate-100 text-sm">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 font-semibold text-slate-800">
                        <User className="h-4 w-4 text-slate-400" />
                        {lead.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5 text-slate-400" />
                          {lead.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5 text-slate-400" />
                          {lead.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div className="flex items-start gap-1">
                        <MessageSquare className="mt-0.5 h-3.5 w-3.5 text-slate-400" />
                        <span>{lead.message || "—"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-bold text-blue-600">
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(lead.createdAt).toLocaleString()}
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
