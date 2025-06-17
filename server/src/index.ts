import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import tourRoutes from "./routes/tourRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tours', tourRoutes);
app.use('/tours', tourRoutes);

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as any)
    .then(() => {
        console.log('✅ MongoDB connected');
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error('❌ MongoDB error:', err);
    });
