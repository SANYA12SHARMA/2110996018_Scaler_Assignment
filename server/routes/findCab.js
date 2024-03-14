import express from "express";
const router = express.Router();
import { findCab } from "../controllers/cabController.js";
router.get('/cab',findCab);
export default router;