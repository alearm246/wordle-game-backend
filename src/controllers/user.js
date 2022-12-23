const user = require("../db/models/User");

const getUsers = async (req, res) => {
  try {
    const users = await user.findAll();
    res.status(200).send(users);
  } catch(err) {
    console.error(err);
    res.status(500).send("An unexpected error occured");
  }
}

const currentUser = (req, res) => {
  if(!req.user) return res.status(404).send("You aren't logged in");

  res.status(200).send(req.user);
}

module.exports = {
  getUsers,
  currentUser
}