import { Request, Response } from "express";
import { Guess } from "../schemas/guess";
import { Match } from "../schemas/match";
import { Team } from "../schemas/team";
import { User } from "../schemas/user";
require("../database/mongoose");
// const matches = require("../../api-requests/match/matches.json");

// async function saveMatches(req: Request, res: Response) {
//   try {
//     for (const match of matches.r16 ) {
//       const { gameDate, homeTeamId, awayTeamId, type } = match;

//       const [homeTeam, awayTeam] = await Team.find({
//         id: [homeTeamId, awayTeamId],
//       });

//       const newMatch = new Match({
//         gameDate,
//         homeTeam: {
//           name: homeTeam.name,
//           image: homeTeam.image,
//         },
//         awayTeam: {
//           name: awayTeam.name,
//           image: awayTeam.image,
//         },
//         type,
//       });

//       await newMatch.save();
//       console.log(`${newMatch.homeTeam.name} x ${newMatch.awayTeam.name} \n`);
//     }

//     res.json({ error: false });
//   } catch (err) {
//     console.error(`Error while save matches`, err);
//     res.json({ matches: null, error: true });
//   }
// }

async function get(req: Request, res: Response) {
  try {
    const matches = await Match.find({});

    res.json({ matches, error: false });
  } catch (err) {
    console.error(`Error while getting matches`, err);
    res.json({ matches: null, error: true });
  }
}

async function getByType(req: Request, res: Response) {
  try {
    const { type } = req.params;

    const matches = await Match.find({ type });

    res.json({ matches, error: false });
  } catch (err) {
    console.error(`Error while getting matches`, err);
    res.json({ matches: null, error: true });
  }
}

async function create(req: Request, res: Response) {
  try {
    const { gameDate, homeTeamId, awayTeamId, type } = req.body;

    const [homeTeam, awayTeam] = await Team.find({
      id: [homeTeamId, awayTeamId],
    });

    const match = new Match({
      gameDate,
      homeTeam: {
        name: homeTeam.name,
        image: homeTeam.image,
      },
      awayTeam: {
        name: awayTeam.name,
        image: awayTeam.image,
      },
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

    const matchAfterUpdate = {
      ..._doc,
      homeScore,
      awayScore,
      matchFinished,
    };

    const matches = await Match.find({ type: matchAfterUpdate.type });
    const users = await User.find({});

    const matchesFinished = matches.filter(
      (match) => match.matchFinished === true
    );

    for (const user of users) {
      const guesses = await Guess.find({ userEmail: user.email });

      if (guesses.length !== 0 && matchesFinished.length !== 0) {
        const score = guesses.reduce((total, currentGuess) => {
          const match = matchesFinished.find(
            (match) => match._id.toString() === currentGuess.matchId
          );
          if (match) {
            if (
              match.homeScore === currentGuess.homeScore &&
              match.awayScore === currentGuess.awayScore
            ) {
              return total + 5;
            } else if (
              (match.homeScore > match.awayScore &&
                currentGuess.homeScore > currentGuess.awayScore) ||
              (match.homeScore < match.awayScore &&
                currentGuess.homeScore < currentGuess.awayScore)
            ) {
              return total + 2;
            } else if (
              match.homeScore === match.awayScore &&
              currentGuess.homeScore === currentGuess.awayScore
            ) {
              return total + 2;
            }
          }
          return total;
        }, 0);

        await User.findOneAndUpdate(
          { email: user.email },
          {
            score,
          }
        );
      }
    }

    res.json({
      matchUpdated: matchAfterUpdate,
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
  create,
  // saveMatches,
  update,
};
