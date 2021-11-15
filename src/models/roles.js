import { Schema, model } from "mongoose";
export default model("Role", new Schema({
    name: String
}, {
    versionKey: false
}));;