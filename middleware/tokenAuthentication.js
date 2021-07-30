const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const { TOKEN_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.sendStatus(401);
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

const generateToken = (user) => {
    return jwt.sign(user, TOKEN_SECRET, { expiresIn: "356d" });
}

module.exports = {
    authenticateToken,
    generateToken
}