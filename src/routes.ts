const express = require("express");
const router = express.Router();

const teamController = require("./controllers/team");
const userController = require("./controllers/user");

// team routes
router.get("/team/:id", teamController.getOne);
router.post("/team", teamController.create);

// user routes
router.get("/users", userController.get);
router.get("/user/:email", userController.getOne);
router.post("/user", userController.create);
router.put("/user/:email", userController.update);

module.exports = router;
