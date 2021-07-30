//const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const { authenticateToken, generateToken } = require('../middleware/tokenAuthentication');
const saltRounds = 12;

const register = async (req, res) => {
    const { user } = req.body;
    const { email, password } = user;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHashed = await bcrypt.hash(password, salt);
    const preparedUser = {
        "email": email,
        "password": passwordHashed
    }
    //console.log(preparedUser);
    const userDoc = new userModel(preparedUser);
    const response = await userDoc.save();
    res.json({
        "message": "guardado con exito",
        "response": response
    });
}

const login = async (req, res) => {
    const { user } = req.body;
    const { email, password } = user;
    const userDoc = await userModel.findOne({ email: email });
    const matchPassword = await bcrypt.compare(password, userDoc.password);
    if (matchPassword) {
        const { email, role, _id } = userDoc;
        const token = generateToken({ "email": email, "role": role, "_id": _id });
        res.json({
            "message": `Inicio de sesion exitoso`,
            "response": {
                "autheticated": token
            }
        });
    } else {
        res.json({
            "message": `Inicio de sesion fallido`
            //"response": {
            //    "autheticated": matchPassword
            //}
        });
    }

}

module.exports = {
    register,
    login
};