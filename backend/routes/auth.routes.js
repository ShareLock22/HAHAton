const express = require("express");
const { login, signup, logout } = require("../controllers/auth.controllers.js");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
