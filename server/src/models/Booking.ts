import mongoose, {Schema, Document} from "mongoose";

export interface IBooking extends Document {
    userId: mongoose.Types.ObjectId;
    tourId: mongoose.Types.ObjectId;
    status: 'active' | 'canceled';
    createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    tourId: {type: Schema.Types.ObjectId, ref: 'Tour', required: true},
    status: {type: String, enum: ['active', 'canceled'], default: 'active'},
    createdAt: {type: Date, default: Date.now, required: true},
});

export default mongoose.model('Booking', BookingSchema);