import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import AxiosAdmin from "@/utils/axiosAdmin";
import SummaryApi from "@/common/SummerAPI";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ImbPaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying, success, failed
  const [error, setError] = useState(null);

  const orderId = searchParams.get("orderId");
  const reservationId = searchParams.get("reservationId");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderId) {
        setStatus("failed");
        setError("Missing Order ID");
        return;
      }

      try {
        const response = await AxiosAdmin.post(SummaryApi.verifySubscriptionPayment.url, { orderId });
        
        if (response.data.success && (response.data.status === "success" || response.data.status === "SUCCESS")) {
          setStatus("success");
          toast.success("Subscription updated successfully!");
          
          // Update local storage with new info if returned
          if (response.data.restaurant) {
             const adminInfo = JSON.parse(localStorage.getItem("rw_admin_info") || "{}");
             const updated = { ...adminInfo, restaurant: response.data.restaurant, subscription: response.data.restaurant.subscription };
             localStorage.setItem("rw_admin_info", JSON.stringify(updated));
          }

          // Delay redirect to show success state
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        } else if (response.data.status === "pending") {
          setStatus("verifying");
          // Retry after 5 seconds if still pending
          setTimeout(verifyPayment, 5000);
        } else {
          setStatus("failed");
          setError(response.data.message || "Payment verification failed");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("failed");
        setError(err.response?.data?.message || "Something went wrong during verification");
      }
    };

    verifyPayment();
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center shadow-2xl">
        {status === "verifying" && (
          <div className="space-y-6">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <Loader2 className="w-20 h-20 animate-spin text-primary mx-auto relative z-10" />
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Verifying Payment</h2>
                <p className="text-slate-400">Please wait while we confirm your transaction with IMB Gateway. Do not refresh or close this page.</p>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Payment Successful!</h2>
                <p className="text-slate-400">Your premium subscription has been activated. Redirecting you to the dashboard...</p>
            </div>
            <Button 
                onClick={() => window.location.href = "/"}
                className="w-full bg-primary text-slate-950 font-bold h-12 rounded-xl"
            >
                Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}

        {status === "failed" && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto border border-destructive/20">
                <XCircle className="w-12 h-12 text-destructive" />
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Verification Failed</h2>
                <p className="text-slate-400">{error || "We couldn't verify your payment. If the amount was deducted, please contact support."}</p>
            </div>
            <div className="flex gap-3">
                <Button 
                    variant="outline"
                    onClick={() => navigate("/subscription-expired")}
                    className="flex-1 bg-white/5 border-white/10 hover:bg-white/10"
                >
                    Try Again
                </Button>
                <Button 
                    onClick={() => window.location.href = "mailto:support@example.com"}
                    className="flex-1 bg-white text-slate-950"
                >
                    Contact Support
                </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImbPaymentCallback;
