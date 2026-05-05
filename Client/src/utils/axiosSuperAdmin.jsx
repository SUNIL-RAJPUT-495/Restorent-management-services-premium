import axios from "axios";
import { baseURL } from "../common/SummaryApi";

/** Sirf admin dashboard — secure token key use ho rahi hai, user tokens se mix nahi hogi */
const AxiosSuperAdmin = axios.create({
    baseURL: baseURL,
    withCredentials: false
});

AxiosSuperAdmin.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("restaurantmanagementsoftwaresuperadmin");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

AxiosSuperAdmin.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("restaurantmanagementsoftwaresuperadmin");
            localStorage.removeItem("rw_admin_info");
            window.dispatchEvent(new CustomEvent("on-unauthorized-admin"));
        }
        return Promise.reject(error);
    }
);

export default AxiosSuperAdmin;
