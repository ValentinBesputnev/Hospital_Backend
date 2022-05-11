const User = require("../../schema/usersSchema");
const bcrypt = require('bcryptjs');

module.exports.createNewUser = (req, res) => {
  try {
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