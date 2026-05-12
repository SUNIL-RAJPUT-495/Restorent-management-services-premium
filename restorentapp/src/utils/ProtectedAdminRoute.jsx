import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosAdmin from '@/utils/axiosAdmin'
import SummaryApi from '@/common/SummerAPI'

/**
 * ProtectedAdminRoute — Handles authentication and subscription gating.
 * It also syncs the latest subscription status from the backend on mount/refresh.
 */
export const ProtectedAdminRoute = ({ children }) => {
    const token = localStorage.getItem("resto_auth_token")
    const location = useLocation();

    // 1. Sync Profile Data from Backend in the background
    const { data: profile, isLoading } = useQuery({
        queryKey: ["admin-profile"],
        queryFn: async () => {
            const response = await AxiosAdmin.get(SummaryApi.getMe.url);
            const updatedData = response.data.restaurant;
            // Sync with localStorage so the UI stays updated
            localStorage.setItem("rw_admin_info", JSON.stringify(updatedData));
            return updatedData;
        },
        enabled: !!token, // Only fetch if logged in
        refetchOnWindowFocus: true, // Check status again when user returns to tab
    });
    
    if (!token) {
        return <Navigate to="/admin/login" replace state={{ from: location }} />
    }

    // Use synced profile data if available, otherwise fallback to localStorage (for immediate gating)
    const adminInfo = profile || (() => {
        try {
            return JSON.parse(localStorage.getItem("rw_admin_info") || "{}");
        } catch {
            return {};
        }
    })();

    const restaurant = adminInfo?.restaurant || adminInfo;
    const subscription = restaurant?.subscription;

    // Validation Logic
    const status = String(subscription?.status || "").toUpperCase();
    const isActive = status === "ACTIVE" || status === "TRIAL";
    const isExpired = subscription?.expiresAt && new Date(subscription.expiresAt) < new Date();
    
    const isPremiumValid = isActive && !isExpired;

    // Loading state handling (optional, but prevents flickers)
    if (isLoading && !adminInfo?.subscription) {
        return <div className="h-screen w-screen flex items-center justify-center text-accent"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div></div>;
    }

    // Define pages that are ALWAYS accessible when logged in (even if expired)
    const isSubscriptionPage = location.pathname === "/subscription-expired" || location.pathname === "/imb-payment";

    // 1. If premium is NOT valid and user is trying to access protected features -> Redirect to renewal
    if (!isPremiumValid && !isSubscriptionPage) {
        return <Navigate to="/subscription-expired" replace />
    }

    // 2. If premium IS valid and user is on the expired page -> Redirect to dashboard
    if (isPremiumValid && location.pathname === "/subscription-expired") {
        return <Navigate to="/" replace />
    }

    return children
}
