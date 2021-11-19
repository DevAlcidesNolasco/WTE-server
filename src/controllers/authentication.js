import User from "../models/users";
import jwt from "jsonwebtoken";
export const signUp = async (req, res) => {
    const { email, password, fullName, roles, } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({
        message: "Ese correo ya esta registrado"
    });
    const newUser = new User({
        email,
        password: await User.encryptPassword(password),
        fullName,
        roles
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({
        id: savedUser._id
    }, process.env.TOKEN_SECRET, {
        expiresIn: 86400
    });
    res.json({
        token
    });
}
export const login = async (req, res) => { }