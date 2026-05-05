import express from "express";
const restorentRouter = express.Router();

import { create_restaurant, get_all_restaurants, get_all_leads } from "../../controllers/Super_Admin/RestorentController.js";
import { Super_Admin_authMiddleware } from "../../middlewares/Super_Admin_authMiddleware.js";

restorentRouter.post("/create",  create_restaurant);
restorentRouter.get("/all", Super_Admin_authMiddleware, get_all_restaurants);
restorentRouter.get("/leads", Super_Admin_authMiddleware, get_all_leads);

export default restorentRouter;