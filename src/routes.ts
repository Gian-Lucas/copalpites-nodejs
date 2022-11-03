const express = require("express");
const router = express.Router();

const teamController = require("./controllers/team");
const userController = require("./controllers/user");
const matchController = require("./controllers/match");
const guessController = require("./controllers/guess");

// team routes
router.get("/team/:id", teamController.getOne);
router.post("/team", teamController.create);

// user routes
router.get("/users", userController.get);
router.get("/user/:email", userController.getOne);
router.post("/user", userController.create);
router.put("/user/:email", userController.update);

// match routes
router.get("/matches", matchController.get);
router.get("/matches/finished", matchController.getByMatchFinished);
router.get("/matches/:type", matchController.getByType);
router.post("/match", matchController.create);
router.put("/match", matchController.update);

// guess routes
router.get("/guesses/:userEmail", guessController.get);
router.post("/guess", guessController.create);

module.exports = router;
