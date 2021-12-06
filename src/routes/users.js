import { Router } from "express";
import * as userController from '../controllers/users';
import * as authorization from '../middlewares/authorization';
import multer from 'multer';
const store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now().toString()
        const extension = file.originalname.split(".").at(-1);
        cb(null, `${uniqueName}.${extension}`);
    }
});
const upload = multer({ storage: store });
const router = Router();
router.get('/', [authorization.tokenVerification, authorization.isModerator], userController.getAllUsers);
router.get('/:userId', authorization.tokenVerification, userController.getUserInfo);
router.put("/:userId", [authorization.tokenVerification, authorization.isModerator], userController.updateUser);
router.delete("/:userId", [authorization.tokenVerification, authorization.isAdmin], userController.deleteUser);
router.post("/photo/:userId", [authorization.tokenVerification, upload.single('avatar'), (req, res, next) => {
    const { file } = req;
    const { filename } = file;
    const photoUrl = `${req.protocol}://${req.get("host")}/gallery/profile/${filename}`;
    req.body = { photoUrl };
    next();
}], userController.updateUser);
export default router;