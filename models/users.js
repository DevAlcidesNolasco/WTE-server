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
    }
}, {
    collection: "users"
});
module.exports = mongoose.model("User", userSchema);