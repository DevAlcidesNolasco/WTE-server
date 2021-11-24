import { Router } from "express";
import * as placesController from "../controllers/places";
const router = Router();
router.get("/", placesController.getPlaces);
router.get("/:placeId", placesController.getPlace);
router.post("/", placesController.createPlace);
router.put("/:placeId", placesController.putPlace);
router.delete("/:placeId", placesController.removePlace);
export default router;