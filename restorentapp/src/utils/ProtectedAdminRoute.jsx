import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

/**
 * ProtectedAdminRoute — Admin routes ko protect karta hai.
 * Agar valid token nahi mila localStorage mein toh login page pe redirect kar dega.
 * Agar premium subscription expired hai toh /subscription-expired pe redirect kar dega.
 */
export const ProtectedAdminRoute = ({ children }) => {
    const token = localStorage.getItem("resto_auth_token")
    const location = useLocation();
    
    if (!token) {
        return <Navigate to="/admin/login" replace />
    }

    const adminInfo = (() => {
        try {
            return JSON.parse(localStorage.getItem("rw_admin_info") || "{}");
        } catch {
            return {};
        }
    })();

    const subscription = adminInfo?.restaurant?.subscription || adminInfo?.subscription;
    const isExpired = subscription?.expiresAt && new Date(subscription.expiresAt) < new Date();
    const isActive = subscription?.status?.toUpperCase() === "ACTIVE" || subscription?.status?.toUpperCase() === "TRIAL";

    const needsSubscription = isExpired || !isActive;

    // If subscription is expired but user is NOT on the expired page, redirect to it.
    if (needsSubscription && location.pathname !== "/subscription-expired") {
        return <Navigate to="/subscription-expired" replace />
    }

    // If subscription is VALID but user is ON the expired page, redirect to home.
    if (!needsSubscription && location.pathname === "/subscription-expired") {
        return <Navigate to="/" replace />
    }

    return children
}
