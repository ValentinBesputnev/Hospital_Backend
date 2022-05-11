const express = require("express");
const userRoutes = express.Router();

const {
  getAllUsers,
  createNewUser,
  loginUser,
} = require("../controllers/user.controller");

module.exports = userRoutes;