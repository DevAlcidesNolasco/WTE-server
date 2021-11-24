import User from '../models/users';
export const getUserInfo = async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.json({
        message: "No se ha proporcionado id de usuario"
    });
    const userFound = await User.findOne({ _id: userId }, { password: 0 });
    res.json(userFound);
}
export const getAllUsers = async (req, res) => {
    res.json({
        users: await User.find({}, { password: 0 })
    });
}