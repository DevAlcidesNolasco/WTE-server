const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minLength: 60,
        maxLength: 60
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    photoUrl: {
        type: String,
        default: "http://localhost:3000/users/photo/default.png"
    }
}, {
    collection: "users"
});
module.exports = mongoose.model("User", userSchema);