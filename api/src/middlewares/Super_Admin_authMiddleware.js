import jwt from "jsonwebtoken";
import SuperAdmin from "../models/Super_Admin/Super.admin.js";

export const Super_Admin_authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] || req.cookies?.restaurantmanagementsoftwaresuperadmin;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const superAdmin = await SuperAdmin.findById(decoded.id);

        if (!superAdmin) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Not a Super Admin"
            });
        }

        req.superAdmin = superAdmin;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid or expired token",
            error: error.message
        });
    }
};
