import express from "express";
import { createLead } from "../../controllers/app/leadController.js";

const router = express.Router();

router.post("/", createLead);

export default router;
