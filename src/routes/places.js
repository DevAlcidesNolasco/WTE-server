import { Router } from "express";
import * as placesController from "../controllers/places";
import * as authorization from '../middlewares/authorization';
const router = Router();
router.get("/", placesController.getPlaces);
router.get("/similar/:placeId", authorization.tokenVerification, placesController.similarPlaces);
router.get("/recommendations/:placeId", authorization.tokenVerification, placesController.recommendedPlaces);
router.get("/likes", authorization.tokenVerification, placesController.getLikes);
router.get("/:placeId", placesController.getPlace);
router.post("/", [authorization.tokenVerification, authorization.isModerator], placesController.createPlace);
router.post("/like/:placeId", authorization.tokenVerification, placesController.likeAPlace);
router.put("/:placeId", [authorization.tokenVerification, authorization.isSeller], placesController.putPlace);
router.delete("/:placeId", [authorization.tokenVerification, authorization.isAdmin]);
export default router;