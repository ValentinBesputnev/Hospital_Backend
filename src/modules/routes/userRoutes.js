const express = require("express");
const userRoutes = express.Router();

const {
  getAllUsers,
  createNewUser,
  loginUser,
} = require("../controllers/user.controller");

router.get('/allUsers', getAllUsers);
router.post('/createNewUser', createNewUser);
router.post('/loginUser', loginUser);

module.exports = userRoutes;