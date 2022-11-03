import { Request, Response } from "express";
import { User } from "../schemas/user";
require("../database/mongoose");

async function get(req: Request, res: Response) {
  try {
    const users = await User.find({});

    res.json({ users, error: false });
  } catch (err) {
    console.error(`Error while getting users`, err);
    res.json({ users: null, error: true });
  }
}

async function getOne(req: Request, res: Response) {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });

    res.json({ user, error: false });
  } catch (err) {
    console.error(`Error while getting user`, err);
    res.json({ user: null, error: true });
  }
}

async function create(req: Request, res: Response) {
  try {
    const { email } = req.body;

    const user = new User({
      email,
    });

    await user.save();

    res.json({ user, error: false });
  } catch (err) {
    res.json({ user: null, error: true });
    console.error(`Error while creating user`, err);
  }
}

async function update(req: Request, res: Response) {
  try {
    const { correctScores, correctWinners } = req.body;
    const { email } = req.params;

    const userUpdated = await User.findOneAndUpdate(
      { email },
      {
        email,
        correctScores,
        correctWinners,
      }
    );

    res.json({ userUpdated, error: false });
  } catch (err) {
    console.error(`Error while updating user`, err);
    res.json({ userUpdated: null, error: true });
  }
}

module.exports = {
  get,
  getOne,
  create,
  update,
};
