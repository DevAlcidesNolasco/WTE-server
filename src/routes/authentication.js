import { Router } from 'express';
import * as authenticationController from "../controllers/authentication";
const router = Router();
router.post("/signup", authenticationController.signUp);
router.post("/login", authenticationController.login);
export default router;