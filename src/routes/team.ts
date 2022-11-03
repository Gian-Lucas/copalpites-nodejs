const express = require("express");
const router = express.Router();

const teamController = require("../controllers/team");

// router.get("/", teamController.get);

router.get("/:id", teamController.getOne);

router.post("/", teamController.create);

// router.put("/:id", teamController.update);

module.exports = router;
