import { Request, Response } from 'express';
import Tour from "../models/Tour";

export const getAllTours = async (req: Request, res: Response) => {
    try {
        const tours = await Tour.find();
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tours" });
    }
}

export const createTour = async (
    req: Request,
    res: Response
): Promise<any>  => {
    const { title, description, price, image, location, date } = req.body;

    if (!title || !description || !price || !image || !location || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newTour = await Tour.create({
            title,
            description,
            price,
            image,
            location,
            date,
        });

        res.status(201).json(newTour);
    } catch (err){
        console.error('Tour creation failed:', err);
        res.status(500).json({ message: "Failed to create tour" });
    }
}