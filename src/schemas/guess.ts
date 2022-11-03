import { Schema, model } from "mongoose";

interface IGuess {
  userEmail: string;
  homeScore: number;
  awayScore: number;
  matchId: string;
}

const guessSchema = new Schema<IGuess>({
  userEmail: { type: String, required: true },
  awayScore: { type: Number, required: true },
  homeScore: { type: Number, required: true },
  matchId: { type: String, required: true },
});

export const Guess = model<IGuess>("Guess", guessSchema);
