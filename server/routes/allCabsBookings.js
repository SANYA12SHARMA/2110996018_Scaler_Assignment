import express from "express";
import { allCabBookings } from "../controllers/allCabsController.js";
const router = express.Router();

router.get("/allCabBookings",allCabBookings);

export default router;