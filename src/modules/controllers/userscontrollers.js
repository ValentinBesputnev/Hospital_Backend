const User = require("../../schema/usersSchema");

module.exports.getAllUsers = (req, res) => {
  User.find().then(result => {
    res.send({ data: result });
  });
};