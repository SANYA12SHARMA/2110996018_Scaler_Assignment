import express from "express";
const router = express.Router();
import { bookCab } from "../controllers/bookingController.js";
import { userData } from "../controllers/userController.js";
router.post('/bookCab',bookCab);
router.get('/userData',userData);
export default router;