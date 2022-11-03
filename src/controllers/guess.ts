import { Request, Response } from "express";
import { Guess } from "../schemas/guess";
require("../database/mongoose");

async function get(req: Request, res: Response) {
  try {
    const { userEmail } = req.params;

    const guesses = await Guess.find({ userEmail });

    res.json({ guesses, error: false });
  } catch (err) {
    console.error(`Error while getting guesses`, err);
    res.json({ guesses: null, error: true });
  }
}

async function create(req: Request, res: Response) {
  try {
    const { userEmail, homeScore, awayScore, matchId } = req.body;

    const guess = new Guess({
      userEmail,
      homeScore,
      awayScore,
      matchId,
    });

    await guess.save();

    res.json({ guess, error: false });
  } catch (err) {
    res.json({ guess: null, error: true });
    console.error(`Error while creating guess`, err);
  }
}

module.exports = {
  get,
  create,
};
