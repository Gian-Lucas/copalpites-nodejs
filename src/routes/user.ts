const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.get("/", userController.get);

router.get("/:email", userController.getOne);

router.post("/", userController.create);

router.put("/:email", userController.update);

module.exports = router;
