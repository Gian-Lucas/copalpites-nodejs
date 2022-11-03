import { Request, Response } from "express";
import { Match } from "../schemas/match";
require("../database/mongoose");

async function get(req: Request, res: Response) {
  try {
    const matches = await Match.find({});

    res.json({ matches, error: false });
  } catch (err) {
    console.error(`Error while getting matches`, err);
    res.json({ matches: null, error: true });
  }
}

async function getByMatchFinished(req: Request, res: Response) {
  try {
    const { matchFinished } = req.body;

    const matches = await Match.findOne({ matchFinished });

    res.json({ matches, error: false });
  } catch (err) {
    console.error(`Error while getting matches`, err);
    res.json({ matches: null, error: true });
  }
}

async function getByType(req: Request, res: Response) {
  try {
    const { type } = req.params;

    const matches = await Match.findOne({ type });

    res.json({ matches, error: false });
  } catch (err) {
    console.error(`Error while getting matches`, err);
    res.json({ matches: null, error: true });
  }
}

async function create(req: Request, res: Response) {
  try {
    const { gameDate, homeTeamId, awayTeamId, type } = req.body;

    const match = new Match({
      gameDate,
      homeTeamId,
      awayTeamId,
      type,
    });

    await match.save();

    res.json({ match, error: false });
  } catch (err) {
    console.error(`Error while creating match`, err);
    res.json({ match: null, error: true });
  }
}

async function update(req: Request, res: Response) {
  try {
    const { id, homeScore, awayScore, matchFinished } = req.body;

    const matchUpdated = await Match.findByIdAndUpdate(id, {
      homeScore,
      awayScore,
      matchFinished,
    });

    const { _doc }: any = matchUpdated;

    const match = {
      ..._doc,
      homeScore,
      awayScore,
      matchFinished,
    };

    res.json({
      matchUpdated: match,
      error: false,
    });
  } catch (err) {
    console.error(`Error while updating match`, err);
    res.json({ matchUpdated: null, error: true });
  }
}

module.exports = {
  get,
  getByType,
  getByMatchFinished,
  create,
  update,
};
