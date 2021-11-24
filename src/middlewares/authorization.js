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
    const user = await User.findOne({ _id: req.userId }, { password: 0 }).populate("roles");
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