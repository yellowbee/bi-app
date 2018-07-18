let user = require("./users");

//let jwt = require('jwt-simple');
//let jwt = require("jsonwebtoken");
const User = require("../models/user");

let auth = {
  login: function(req, res) {
    let userName = req.body.userName || "";
    let password = req.body.password || "";

    if (userName == "" || password == "") {
      res.status(401);
      res.json({
        status: 401,
        message: "Invalid credentials"
      });
      return;
    }

    // Fire a query to your DB and check if the credentials are valid
    auth.validate(req, res, userName, password);
  },

  validate: function(req, res, userName, password) {
    /*for (let i = 0; i < user.data.length; i++) {
      if (
        user.data[i].username === username &&
        user.data[i].password === password
      ) {
        return { username: user.data[i].username, fullName: user.data[i].fullName };
      }
    }*/
    console.log(userName + ' ' + password);
      User.find({ userName: userName, password: password }, (err, users) => {
          if (err) {
            console.log(err);
            res.json({result: err});
          } else if (users.length > 0) {
            res.json(users[0]);
          } else {
            res.status(401);
              res.json({
                  status: 401,
                  message: "Invalid credentials"
              });
          }
      });
  },

  validateUser: function(username) {
    // spoofing the DB response for simplicity
    let dbUserObj = {
      // spoofing a userobject from the DB.
      name: "arvind",
      role: "admin",
      username: "arvind@myapp.com"
    };

    return dbUserObj;
  }
};

/*let genToken = function(user) {
  let token = jwt.sign(
    {
      username: user.username,
      role: user.role,
      exp: Date.now() + 7 * 24 * 3600 * 1000
    },
    require("../config/secret")()
  );

  return {
    token: token,
    expires: Date.now() + 7 * 24 * 3600 * 1000,
    user: user
  };
};*/

/*function expiresIn(numDays) {
    let dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}*/

module.exports = auth;
