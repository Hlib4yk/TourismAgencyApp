import mongoose, {Schema, Document} from "mongoose";

export interface ITour extends Document {
    title: string;
    description: string;
    price: number;
    image: string;
    location: string;
    date: string;
};

const TourSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
});

export default mongoose.model<ITour>('Tour', TourSchema);

