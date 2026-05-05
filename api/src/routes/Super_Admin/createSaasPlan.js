import { Router } from "express";
import { createSaasPlan, getAllSaasPlans, updateSaasPlan, deleteSaasPlan } from "../../controllers/Super_Admin/saasPlanController.js";
import { Super_Admin_authMiddleware } from "../../middlewares/Super_Admin_authMiddleware.js";

const SaasPlanRouter = Router();

SaasPlanRouter.post("/create-saas-plan", Super_Admin_authMiddleware, createSaasPlan)
SaasPlanRouter.get("/all-saas-plans", getAllSaasPlans)
SaasPlanRouter.put("/update-saas-plan/:id", Super_Admin_authMiddleware, updateSaasPlan)
SaasPlanRouter.delete("/delete-saas-plan/:id", Super_Admin_authMiddleware, deleteSaasPlan)

export default SaasPlanRouter;