import { Schema, model } from "mongoose";

interface ITeam {
  id: string;
  name: string;
  image: string;
  group: string;
}

const teamSchema = new Schema<ITeam>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  group: { type: String, required: true },
});

export const Team = model<ITeam>("Team", teamSchema);
