import express from "express";
const router = express.Router();
import { findCab } from "../controllers/cabController.js";
router.get('/findCab',findCab);
export default router;