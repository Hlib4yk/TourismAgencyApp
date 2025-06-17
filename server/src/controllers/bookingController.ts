import {Request, Response} from "express";
import Booking from "../models/Booking";
import {AnyArray} from "mongoose";

export const createBooking = async (
    req: Request,
    res: Response) :Promise<any> =>  {
    const { userId, tourId } = req.body;

    if( !userId || !tourId ) {
        return res.status(400).json({ message: 'User ID and Tour ID are required' });
    }

    try {
        const newBooking = await Booking.create({ userId, tourId });
        res.status(201).json(newBooking);
    } catch (err) {
        console.error('Booking error:', err);
        res.status(500).json({ message: 'Failed to create booking' });
    }
};

export const  getBookingByUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const bookings = await Booking.find({userId: id})
            .populate('tourId')
            .sort({createdAt: -1});
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get booking' });
    }
};

export const cancelBooking = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        const booking = await Booking.findByIdAndUpdate(
            id,
            { status: "CANCELED" },
            { new: true}
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ message: 'Failed to cancel booking' });
    }
}