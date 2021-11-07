const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const { TOKEN_SECRET } = process.env;
const rolesAlloweds = {
    0: ["ADMIN", "SELLER", "USER"],
    1: ["ADMIN", "SELLER"],
    2: ["ADMIN"]
};

const authenticateToken = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];
    console.log(token);
    if (token === null || token === undefined) return res.status(401).json({
        "message": "No se ha determinado token"
    });
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        if (!rolesAlloweds[req.roleAllowed].includes(user.role)) return res.status(401).json({
            "message": "Usuario no autorizado"
        });
        req.user = user;
        //console.log(user);
        next();
    });
}

const generateToken = (user) => {
    return jwt.sign(user, TOKEN_SECRET, { expiresIn: "1d" });
}

module.exports = {
    authenticateToken,
    generateToken
}