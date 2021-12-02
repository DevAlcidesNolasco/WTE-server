import { Router } from "express";
import * as userController from '../controllers/users';
import * as authorization from '../middlewares/authorization';
const router = Router();
router.get('/', [authorization.tokenVerification, authorization.isModerator], userController.getAllUsers);
router.get('/:userId', [authorization.tokenVerification, authorization.isModerator], userController.getUserInfo);
router.put("/:userId", [authorization.tokenVerification, authorization.isModerator]);
router.delete("/:userId", [authorization.tokenVerification, authorization.isAdmin], userController.deleteUser);
export default router;