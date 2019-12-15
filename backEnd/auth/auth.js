var mongoose = require("mongoose");
var User = mongoose.model("users");

exports.isAuth = function(req, res, next) {
  if (!req.headers.authorization || req.headers.authorization === "undefined") {
    return res.json({
      status: 401,
      msg: "Session Expired, Please login again"
    });
  }
  var token = req.headers.authorization;
  var user = new User();
  user.verifyToken(token, function(valid) {
    if (!valid) {
      return res.json({
        status: 401,
        msg: "Session Expired, Please login again"
      });
    } else {
      User.findOne({ _id: valid._id, is_deleted: false }, function(
        err,
        getUser
      ) {
        if (getUser) {
          req.body.user_params = valid;
          next();
        } else {
          return res.json({
            status: 403,
            msg: "Session Expired, Please login again"
          });
        }
      });
    }
  });
};
