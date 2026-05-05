import React, { useState } from "react";
import axios from "axios";
import SummaryApi from "../../common/SummaryApi";

const LeadPopup = ({ open, onClose, onSubmitted }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-slate-900">Get Free Demo</h3>
        <p className="mt-1 text-sm text-slate-600">
          Apne restaurant ke liye quick setup call book karein.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-orange-500"
          />
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-orange-500"
          />
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-orange-500"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message (optional)"
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-orange-500"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 rounded-lg border border-slate-300 py-2 font-semibold text-slate-700"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 rounded-lg bg-orange-500 py-2 font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadPopup;
