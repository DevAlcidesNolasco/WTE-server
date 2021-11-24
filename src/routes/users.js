import { Router } from "express";
import * as userController from '../controllers/users';
const router = Router();
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserInfo);
router.post("/");
router.put("/:userId");
router.delete("/:userId");
export default router;