import { Router } from "express";
import { getAllTours, createTour } from "../controllers/tourController";
import {authMiddleware} from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware,  getAllTours);
router.post("/", authMiddleware,  createTour);

export default router;
