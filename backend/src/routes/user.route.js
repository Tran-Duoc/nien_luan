const express = require("express");
const router = express.Router();
const {
  register,
  login,
  changePassword,
} = require("../controllers/user.controller");

router.get("/", (req, res) => {
  return res.json({
    message: " hello",
  });
});
router.post("/register", register);
router.post("/login", login);
router.post("/change/:id", changePassword);

module.exports = router;
