export const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SummaryApi = {
    // SuperAdmin
    loginSuperAdmin: { url: baseURL + "/api/super-admin/login-super-admin", method: "post" },
    createSaasPlan: { url: baseURL + "/api/saas-plan/create-saas-plan", method: "post" },
    getSaasPlans: { url: baseURL + "/api/saas-plan/all-saas-plans", method: "get" },
    updateSaasPlan: (id) => ({ url: baseURL + `/api/saas-plan/update-saas-plan/${id}`, method: "put" }),
    deleteSaasPlan: (id) => ({ url: baseURL + `/api/saas-plan/delete-saas-plan/${id}`, method: "delete" }),
    createRestaurant: { url: baseURL + "/api/restaurant/create", method: "post" },
    getAllRestaurants: { url: baseURL + "/api/restaurant/all", method: "get" },
    
}

export default SummaryApi
