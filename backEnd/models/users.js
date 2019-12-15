var mongoose = require("mongoose");
var crypto = require("crypto");
var secret = require("../config/secret");
var jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "This Email already exist!"],
      required: "Email is required"
    },
    password: {
      type: String,
      default: null
    },
    username: { type: String, default: null },
    salt: {
      type: String
    },
    token: {
      type: String,
      default: null
    },
    forgot_password_token: {
      type: String,
      default: null
    },
    status: { type: Boolean, default: false },
    is_deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

UserSchema.pre("save", function (next) {
  var user = this;
  // generate a random salt for every user for security
  user.salt = crypto.randomBytes(16).toString("hex");
  user.email_verification_token = crypto.randomBytes(16).toString("hex");
  user.password = crypto
    .pbkdf2Sync(user.password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  next();
});

UserSchema.methods.generateJwt = function (next) {
  var expiry = new Date();
  return jwt.sign(
    {
      _id: this._id,
      email: this.email
    },
    secret.secret
    // { expiresIn: "24h" }
  ); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

UserSchema.methods.verifyToken = function (token, cb) {
  jwt.verify(token, secret.secret, function (err, dcode) {
    if (err) {
      cb(false);
    } else {
      cb(dcode);
    }
  });
};
/*
 * Function: isEmailExist
 * Des: Funtion is use to check is email exist or not in our records
 */
UserSchema.statics.isEmailExist = function (email, callback) {
  var flag = false;
  users.findOne({ email: email, is_deleted: false }, function (err, user) {
    if (err) {
      res.json({ status: 0, msg: "Something went wrong" });
    } else {
      if (user) {
        flag = true;
      } else {
        flag = false;
      }
    }
    callback(flag);
  });
};



var users = mongoose.model("users", UserSchema);
module.exports = users;