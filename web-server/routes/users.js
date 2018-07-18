/**
 * Created by bhuang on 12/4/17.
 */
let jwt = require("jsonwebtoken");
const User = require("../models/user");
let authMod = require('./auth');

let service = {

    getAll: function(req, res) {
        var allusers = data; // Spoof a DB call
        res.json(allusers);
    },

    getOne: function(req, res) {
        var id = req.params.id;
        var user = data[0]; // Spoof a DB call
        res.json(user);
    },

    create: function(req, res) {
        if (!req.body) {
            res.json({ result: "REQUEST IGNORED" });
        } else {
            var newuser = req.body;
            //data.push(newuser); // Spoof a DB call
            //res.json(newuser);
            User.find({ userName: newuser.userName }, (err, users) => {
                if (err) {
                    res.json({ result: err });
                }
                if (users.length > 0) {
                    console.log(users);
                    res.json({ result: "username is not available" });
                } else {
                    let token = genToken(newuser);

                    const user = new User({
                        fullName: newuser.fullName,
                        userName: newuser.userName,
                        password: newuser.password,
                        token: {
                            value: token,
                            expires: Date.now() + 7 * 24 * 3600 * 1000
                        }
                    });

                    user.save((err, obj) => {
                        if (err) {
                            res.json({ result: err });
                        } else {
                            res.json({
                                user: {
                                    fullName: newuser.fullName,
                                    userName: newuser.userName
                                },
                                token: {
                                    value: token,
                                    expires: Date.now() + 7 * 24 * 3600 * 1000
                                }
                            });
                        }
                    });
                }
            });
        }
    },

    update: function(req, res) {
        let updateuser = req.body;
        let id = req.params.id;
        data[id] = updateuser // Spoof a DB call
        res.json(updateuser);
    },

    delete: function(req, res) {
        let id = req.params.id;
        data.splice(id, 1); // Spoof a DB call
        res.json(true);
    }
};

let genToken = function(user) {
    //let expires = expiresIn(7); // 7 days
    /*let token = jwt.encode({
     exp: expires
     }, require('../config/secret')());*/
    return jwt.sign(
        {
            username: user.username,
            exp: Date.now() + 7 * 24 * 3600 * 1000
        },
        require("../config/secret")()
    );
};



var data = [
    {
        fullName: "Ben",
        username: 'ben@gmail.com' ,
        password: 'password'
    },
    {
        fullName: "Bruce",
        username: 'bruce@gmail.com' ,
        password: 'password'
    },
    {
        username: 'Cathy',
        password: 'pass03'
    }
];



module.exports = {service: service, genToken: genToken, data: data};