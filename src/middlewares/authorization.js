import jwt from 'jsonwebtoken';
import User from '../models/users';
export const tokenVerification = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(403).json({
        message: "No token provided"
    });
    try {
        const decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
        req.userId = decoded?.id;
        //console.log(`userId is ${req.userId}`);
        const userFound = await User.findOne({ _id: decoded?.id }, { password: 0 });
        if (!userFound) return res.status(404).json({
            message: "User doesn't exist"
        });
        next();
    } catch (error) {
        console.error(error);
        if (error.name === "TokenExpiredError") res.status(401).json({ message: "Token Expired" });
        if (error.name === "JsonWebTokenError") res.status(401).json({ message: "Token Invalido" });
    }
}
export const isModerator = async (req, res, next) => {
    const user = await User.findOne({ _id: req.userId }, { password: 0, photoUrl: 0, email: 0, fullName: 0, createdAt: 0, updatedAt: 0 }).populate("roles");
    for (const role of user.roles) {
        if (role.name === "Moderator") {
            next();
            return;
        }
    }
    res.status(403).json({
        message: "Require Moderator Role"
    });
}
export const isAdmin = async (req, res, next) => {
    const user = await User.findOne({ _id: req.userId }, { password: 0, photoUrl: 0, email: 0, fullName: 0, createdAt: 0, updatedAt: 0 }).populate("roles");
    for (const role of user.roles) {
        if (role.name === "Admin") {
            next();
            return;
        }
    }
    res.status(403).json({
        message: "Require Admin Role"
    });
}