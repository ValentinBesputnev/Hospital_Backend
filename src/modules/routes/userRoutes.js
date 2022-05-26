const userRoutes = new Router();
const { check } = require("express-validator");
const middleware = require("../../middleware/middleware");
const {
  getAllUsers,
  createNewUser,
  loginUser,
} = require("../controllers/usersControllers");

userRoutes.post(
  "/createNewUser",
  [
    check("email", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть больше 4 символом").isLength({
      min: 4,
    }),
  ],
  createNewUser
);
userRoutes.post("/loginUser", loginUser);
userRoutes.get("/allUsers", middleware, getAllUsers);

module.exports = userRoutes;
