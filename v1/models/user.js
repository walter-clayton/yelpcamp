var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    avatar: String,
    email: String,
    password: String,
    adminCode: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);


