const Router = require("express");
const router = new Router();
const { check } = require("express-validator");
const {
  getAllUsers,
  createNewUser,
  loginUser,
} = require("../controllers/usersControllers");

router.post(
  "/createNewUser",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть больше 4 символом").isLength({
      min: 4,
    }),
  ],
  createNewUser
);
router.post("/loginUser", loginUser);
router.get("/allUsers", getAllUsers);

module.exports = router;
