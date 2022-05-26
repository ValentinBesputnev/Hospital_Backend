const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../schema/usersSchema");
const { validationResult } = require("express-validator");
const secret = process.env.secret;

const generateAccecToken = (_id, email) => {
  const payload = {
    _id,
    email,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

module.exports.createNewUser = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с такой почтой зарегистрирован" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);

      const user = new User({ email, password: hashPassword });

      await user.save();
      const token = generateAccecToken(user._id, email);
      return res.json({ token, email });
    } catch (error) {
      res.status(400).json({ message: "Registration error" });
    }
  } else {
    return res.status(400).json({ message: "Error adding user!" });
  }
};
