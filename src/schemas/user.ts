import { Schema, model } from "mongoose";

interface IUser {
  email: string;
  correctScores: number;
  correctWinners: number;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  correctScores: { type: Number, default: 0 },
  correctWinners: { type: Number, default: 0 },
});

export const User = model<IUser>("User", userSchema);
