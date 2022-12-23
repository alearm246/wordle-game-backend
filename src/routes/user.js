const express = require("express");
const router = express.Router();

const { getUsers, currentUser } = require("../controllers/user");

router.get("/", getUsers);
router.get("/current", currentUser);

module.exports = router;