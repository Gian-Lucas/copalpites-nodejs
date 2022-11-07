import { Schema, model } from "mongoose";

interface IUser {
  email: string;
  name: string;
  score: number;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
});

export const User = model<IUser>("User", userSchema);
