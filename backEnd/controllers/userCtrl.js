var mongoose = require("mongoose");
var User = require("../models/users");
var Notes = require("../models/notes");
var crypto = require("crypto");

var loginUser = function (req, res) {
  let userData = req.body
  User.findOne(
    {
      email: userData.data.username,
      is_deleted: false,
      status: true
    },
    function (err, user) {
      if (err) {
        res.json(err);
      }
      if (!user) {
        res.json({
          status: 404,
          msg: "Email not exist!"
        });
      } else {
        var password = crypto
          .pbkdf2Sync(userData.data.password, user.salt, 1000, 64, "sha512")
          .toString("hex");
        User.findOne(
          {
            email: userData.data.username,
            password: password
          },
          function (err, userlogin) {
            if (err) {
              res.json({
                status: 400,
                msg: "Server error!",
                err
              });
            }
            if (!userlogin) {
              res.json({
                status: 404,
                msg: "Invalid credentials"
              });
            } else {
              res.json({
                status: 200,
                msg: "Login successful!",
                data: { token: userlogin.generateJwt() }
              });
            }
          }
        );
      }
    }
  );
};


var LoggedInUserDetails = function (req, res) {
  User.findOne(
    {
      _id: req.body.user_params._id,
    },
    function (err, userlogin) {
      if (err) {
        res.json(err);
      }
      if (!userlogin) {
        res.json({
          status: 404,
          msg: "No user found!"
        });
      } else {
        res.json({
          status: 200,
          data: userlogin
        });
      }
    }
  );
};

var createUser = function (req, res) {
  var userId, userName, fullname, data, password;
  data = {
    email: req.body.data.email,
    password: req.body.data.password,
    username: req.body.data.username,
  };

  var new_user = new User(data);
  new_user.save(function (err, result) {
    if (err) {
      if (err.code === 11000) {
        res.json({
          status: 404,
          msg: "Email alredy exist, Please try new one!"
        });
      }
      res.json({
        status: 400,
        msg: "Registration failed!",
        error: err
      });
    } else {
      res.json({
        status: 200,
        msg: "Registration successfull! Now you can login."
      });
    }
  });
};

var createNotes = async function (req, res) {
  let data = {
    title: req.body.data.title,
    category: req.body.data.category,
    notes: req.body.data.notes,
    user_id: req.body.user_params._id
  };
  var new_note = new Notes(data);
  new_note.save(function (err, result) {
    if (err) {
      res.json({
        status: 400,
        msg: "Notes create failed!",
        error: err
      });
    } else {
      var notesData = await getNotes(req.body.user_params._id)
      if (notesData.status == 200) {
        res.json({
          status: 200,
          msg: "Notes create successfull!",
          data: notesData
        });
      } else {
        res.json({
          status: 404,
          msg: "Error while fetching notes data!",
          data: notesData
        });
      }
    }
  });
};

function getNotes(userID) {
  Notes.findAll({
    user_id: userID,
    is_deleted: false
  }, function (err, result) {
    if (err) {
      return { status: 404, err }
    } else {
      return { status: 200, result }
    }
  });
}


var editNotes = function (req, res) {
  let data = {
    title: req.body.editData.title,
    category: req.body.editData.category,
    notes: req.body.editData.notes
  }
  Notes.update({ _id: req.body.editId, is_deleted: false }, { $set: data })
    .then(noteData => {
      if (noteData.nModified) {
        var notesData = await getNotes(req.body.user_params._id)
        if (notesData.status == 200) {
          res.json({
            status: 200,
            msg: "Notes create successfull!",
            data: notesData
          });
        } else {
          res.json({
            status: 404,
            msg: "Error while fetching notes data!",
            data: notesData
          });
        }
      }
      else {
        res.json({
          status: 404,
          msg: "Notes updated failed!"
        })
      }
    })
    .catch(err => {
      res.json({
        status: 400,
        msg: "Server error!",
        err
      })
    })
};

var deleteNote = function (req, res) {
  Notes.update({ _id: req.editId }, { $set: { is_deleted: true } })
    .then(noteData => {
      if (noteData.nModified) {
        var notesData = await getNotes(req.body.user_params._id)
        if (notesData.status == 200) {
          res.json({
            status: 200,
            msg: "Notes create successfull!",
            data: notesData
          });
        } else {
          res.json({
            status: 404,
            msg: "Error while fetching notes data!",
            data: notesData
          });
        }
      }
      else {
        res.json({
          status: 404,
          msg: "Notes updated failed!"
        })
      }
    })
    .catch(err => {
      res.json({
        status: 400,
        msg: "Server error!",
        err
      })
    })
};

exports.loginUser = loginUser;
exports.LoggedInUserDetails = LoggedInUserDetails;
exports.createUser = createUser
exports.createNotes = createNotes
exports.getNotes = getNotes
exports.editNotes = editNotes
exports.deleteNote = deleteNote