import express from "express";
const router = express.Router();
import {getShortestPath} from "../controllers/pathController.js";

router.post('/shortestPath', getShortestPath);

export default router;