import SuperAdmin from "../../models/Super_Admin/Super.admin.js";
import bcrypt from 'bcryptjs';
import  generateToken from "../../utils/generateToken.js";

export const loginSuperAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }
        const superAdmin = await SuperAdmin.findOne({ email });
        if (!superAdmin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, superAdmin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = generateToken(superAdmin._id);
        res.json({ token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error: " + error.message });
    }
}