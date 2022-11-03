import { Request, Response } from "express";
import { Team } from "../schemas/team";
require("../database/mongoose");

async function getOne(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const team = await Team.findOne({ id });

    res.json({ team, error: false });
  } catch (err) {
    console.error(`Error while getting team`, err);
    res.json({ team: null, error: true });
  }
}

async function create(req: Request, res: Response) {
  try {
    const { name, image, group, id } = req.body;

    const team = new Team({
      id,
      name,
      image,
      group,
    });

    await team.save();

    res.json({ team, error: false });
  } catch (err) {
    res.json({ team: null, error: true });
    console.error(`Error while creating team`, err);
  }
}

module.exports = {
  getOne,
  create,
};
