import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
    },
});

// Хешування паролю перед збереженням
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Порівняння паролю
UserSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
