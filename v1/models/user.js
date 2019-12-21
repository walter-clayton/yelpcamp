var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

UserSchema = new mongoose.Schema({
    firstName: {type: String, unique: true, required: true},
    lastName: String,
    username: String,
    avatar: String,
    email: {type: String, unique: true, required: true},
    password: String,
    resetPasspwordToken: String,
    resetPasspwordExpires: Date, 
    isAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);


