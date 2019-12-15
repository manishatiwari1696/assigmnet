var express = require("express");
var app = express();
var router = express.Router();

var userCtrl = require("../controllers/userCtrl");
var auth = require("../auth/auth");

router.use("/createUser", userCtrl.createUser);
router.use("/login", userCtrl.loginUser);
router.use("/LoggedInUserDetails", auth.isAuth, userCtrl.LoggedInUserDetails);
router.use("/createNotes", auth.isAuth, userCtrl.createNotes);
router.use("/getNotes", auth.isAuth, userCtrl.getNotes);
router.use("/editNotes", auth.isAuth, userCtrl.editNotes);
router.use("/deleteNote", auth.isAuth, userCtrl.deleteNote);

module.exports = router;