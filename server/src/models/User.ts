import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
    _id: Types.ObjectId; 
    googleId: string;
    email: string;
    displayName: string;
    photo?: string;
}

const userSchema = new Schema<IUser>({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    photo: { type: String },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
