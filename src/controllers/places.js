//const savePlace = async (req, res) => {
//    const { place } = req.body;
//    const preparingPlace = new placeModel(place);
//    const response = await preparingPlace.save();
//    res.json({
//        "message": (response === preparingPlace) ? "guardado con exito" : "no se pudo realizar accion",
//        "response": response
//    });
//}
//const updatePlace = async (req, res) => {
//    const { place } = req.body;
//    const { _id, ...updatedPlace } = place;
//    const response = await placeModel.findOneAndUpdate({ _id: _id }, { $set: { updatedPlace } });
//    res.json({
//        "message": "actualizado con exito",
//        "response": response
//    });
//}
//module.exports = {
//    getPlacesNear,
//    getPlace,
//    savePlace,
//    updatePlace
//};

import Place from "../models/places";
export const getPlaces = async (req, res) => {
    let { distance } = req.body;
    distance = distance ? distance : 300;
    const { coordinates } = req.body;
    if (!coordinates) return res.json({
        message: "No ha proporcionado ubicacion"
    });
    const { lat, lng } = coordinates;
    const message = `Obteniendo lugares en Latitud: ${lat} Longitud: ${lng}, en un radio de ${distance}`;
    const places = await Place.find({
        location: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [lat, lng]
                },
                $maxDistance: distance
            }
        }
    });
    console.log(message);
    res.json(places);
};
export const createPlace = async (req, res) => {
    const preparedPlace = new Place(req.body);
    const savedPlace = await preparedPlace.save();
    res.status(201).json(savedPlace);
};
export const putPlace = (req, res) => {

};
export const removePlace = (req, res) => {

};
export const getPlace = async (req, res) => {
    const { placeId } = req.params;
    if (!placeId) return res.json({
        message: "No ha proporcionado id del lugar"
    });
    const placeFound = await Place.findById(placeId);
    if (!placeFound) return res.json({
        message: "No existe ese lugar"
    });
    res.json(placeFound);
};