const express = require("express");
const router = express.Router();

const { updateUserStats, incrementStats } = require("../controllers/userStats");

router.put("/:id", updateUserStats);
router.put("/:id/increment", incrementStats);


module.exports = router;