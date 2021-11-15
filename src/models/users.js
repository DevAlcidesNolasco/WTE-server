import { Schema, model } from "mongoose";
const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }],
    photoUrl: {
        type: String,
        default: "http://localhost:3000/users/photo/default.png"
    }
}, {
    timestamps: true,
    versionKey: false
});
export default model("User", userSchema);