import { Router } from 'express';
import {
    createBooking,
    getBookingByUser,
    cancelBooking
} from "../controllers/bookingController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const router = Router();

router.post('/',authMiddleware,  createBooking);
router.get('/user/:id', authMiddleware, getBookingByUser);
router.delete('/:id', authMiddleware,  cancelBooking);

export default router;