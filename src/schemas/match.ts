import { Schema, model } from "mongoose";

interface IMatch {
  gameDate: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  matchFinished: boolean;
  type: "r1" | "r2" | "r3" | "r16" | "qf" | "sf" | "f";
}

const matchSchema = new Schema<IMatch>({
  gameDate: { type: String, required: true },
  homeTeamId: { type: String, required: true },
  awayTeamId: { type: String, required: true },
  homeScore: { type: Number, default: 0 },
  awayScore: { type: Number, default: 0 },
  matchFinished: { type: Boolean, default: false },
  type: { type: String, required: true },
});

export const Match = model<IMatch>("Match", matchSchema);
