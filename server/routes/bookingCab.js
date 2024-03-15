import express from "express";
const router = express.Router();
import { book } from "../controllers/bookingController.js";
router.post('/bookCab',book);
export default router;