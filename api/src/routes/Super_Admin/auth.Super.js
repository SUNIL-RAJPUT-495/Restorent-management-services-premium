import { loginSuperAdmin } from "../../controllers/Super_Admin/Super_Admn.js";
import express from "express";

const superAdminRouter = express.Router();

superAdminRouter.post("/login-super-admin", loginSuperAdmin);

export default superAdminRouter;