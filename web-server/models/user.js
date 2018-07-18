/**
 * Created by bhuang on 3/17/18.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const token = new Schema({ value: String, expires: Number });

const UserSchema = new Schema(
    {
        fullName: String,
        userName: String,
        password: String,
        token: token
    },
    { collection: "users" }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;

