import express from "express";
const router = express.Router();
import { userData } from "../controllers/userController.js";
router.get('/userData',userData);
export default router;