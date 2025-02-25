const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true, required: true },
    role: String,
    password: String
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
