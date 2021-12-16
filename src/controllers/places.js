import Place from "../models/places";
import { isValidObjectId } from '../libs/validations';
export const getPlaces = async (req, res) => {
    let { distance } = req.body;
    distance = distance ? distance : 300;
    const { coordinates } = req.body;
    if (!coordinates) return res.json({ message: "No ha proporcionado ubicación" });
    const { lat, lng } = coordinates;
    //const { filters } = req.body;
    //if (!filters) return 
    //const { starsAbove } = filters;
    //console.log(starsAbove);
    const places = await Place.find({ location: { $nearSphere: { $geometry: { type: "Point", coordinates: [lat, lng] }, $maxDistance: distance } } });
    res.json(places);
};
export const createPlace = async (req, res) => {
    const preparedPlace = new Place(req.body);
    const savedPlace = await preparedPlace.save();
    res.status(201).json(savedPlace);
};
export const putPlace = async (req, res) => {
    const { placeId } = req.params;
    if (!placeId) return res.json({ message: "No ha proporcionado id del lugar" });
    if (!isValidObjectId(placeId)) return res.json({ message: "El id del lugar no es valido" });
    const updatedPlace = await Place.replaceOne({ _id: placeId }, req.body);
    if (updatedPlace.n === 0) return res.json({ message: "No existe ese lugar" });
    if (updatedPlace.nModified === 0) return res.json({ message: "No se pudo editar el lugar" });
    res.json(updatedPlace);
};
export const removePlace = async (req, res) => {
    const { placeId } = req.params;
    if (!placeId) return res.json({ message: "No ha proporcionado id del lugar" });
    if (!isValidObjectId(placeId)) return res.json({ message: "El id del lugar no es valido" });
    const placeDeleted = await Place.findOneAndDelete({ _id: placeId });
    //const placeDeleted = await Place.findByIdAndRemove(placeId);
    if (!placeDeleted) return res.json({ message: "No existe ese lugar" });
    res.json(placeDeleted);
};
export const getPlace = async (req, res) => {
    const { placeId } = req.params;
    if (!placeId) return res.json({ message: "No ha proporcionado id del lugar" });
    if (!isValidObjectId(placeId)) return res.json({ message: "El id del lugar no es valido" });
    const placeFound = await Place.findOne({ _id: placeId });
    if (!placeFound) return res.json({ message: "No existe ese lugar" });
    res.json(placeFound);
};
export const recommendedPlaces = (req, res) => {
    const { placeId } = req.params;
    console.log(`Id Place is ${placeId}`);
    console.log(req.body);
    res.json({ message: "Get Recommended Places" });
};
export const similarPlaces = async (req, res) => {
    const { placeId } = req.params;
    if (!placeId) return res.json({ message: "No ha proporcionado id del lugar" });
    if (!isValidObjectId(placeId)) return res.json({ message: "El id del lugar no es valido" });
    const placeFound = await Place.findOne({ _id: placeId }, { gallery: 0, contact: 0, description: 0, ubication: 0, rating: 0, schedule: 0, name: 0 });
    searchByCategories(placeFound.category);
    res.json({ message: "Get Similar in 500mts Places" });
};
export const getLikes = async (req, res) => {
    const { userId } = req;
    console.log(userId);
    const likedPlaces = await Place.find({ rating: { $elemMatch: { user: userId } } });
    //console.log("Get Liked Places");
    res.json(likedPlaces);
};
export const likeAPlace = async (req, res) => {
    const { rating } = req.body;
    const { userId } = req;
    const { placeId } = req.params;
    if (!isValidObjectId(placeId)) return res.json({ message: "El id del lugar no es valido" });
    if ((rating > 5 || rating < 0) || !rating || isNaN(rating)) return res.json({ message: "Calificacion no valida" });
    const place = await Place.findOne({ _id: placeId });
    const found = place.rating.findIndex((rate) => rate.user.toString() === userId);
    if (found > -1) {
        place.rating[found].rate = rating;
    } else {
        place.rating.push({ user: userId, rate: rating });
    }
    const ratingSaved = await place.save();
    res.json(ratingSaved);
};
const searchByCategories = (categories) => {
    for (const category of categories) {
        console.log(category);
    }
};
