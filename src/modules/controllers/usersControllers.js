const User = require("../../schema/usersSchema");
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator")
const jwt = require('jsonwebtoken');
const secret = process.env.secret;

const generateAccecToken = (id, username) => {
  const payload = {
    id,
    username,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

module.exports.createNewUser = (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({message: "Ошибка при регистрации", errors})
    }
    const {username, password} = reg.body
    const candidate = await User.findOne({username})
    if (candidate) {
      return res.status(400).json({message: "Пользователь с такой почтой зарегистрирован"})
    }
    const hashPassword = bcrypt.hashSync(password, 5);
    const user = new User({username, password: hashPassword})
    await user.save()
    return res.json({message: "Пользователь успешно зарегистрирован"})
  } catch(e) {
    console.log(e);
    res.status(400).json({messege: "Error"})
  }
};

module.exports.loginUser = (req,res) => {
  try {
    const {username, password} = reg.body
    const user = await User.findOne({username})
    if (!user) {
      return res.status(400).json({message: `Пользователь ${username} не найден`})
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({message: "Введен неверный пароль"})
    }
    const token = generateAccecToken(user._id, username)
  } catch (e) {
    console.log(e);
    res.status(400).json({message: "Login error"})
  }
}