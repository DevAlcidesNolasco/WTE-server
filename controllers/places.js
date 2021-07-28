//const placeModel = require('../models/places');
const placeModel = require('../models/places');
const getPlacesNear = async (req, res) => {
    const { distance, coordinates } = req.body;
    const { lat, lng } = coordinates;
    const response = await placeModel.find({
        location: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [lat, lng]
                },
                $maxDistance: (distance) ? distance : 400
            }
        }
    });
    res.json({
        "messaje": "Encontramos estos lugares cercanos a tí",
        "response": response
    });
}
const getPlace = async (req, res) => {
    const { _id } = req.body;
    const response = await placeModel.find({ _id: _id });
    res.json({
        "messaje": "Se encontró el sitio que buscabas",
        "response": response
    });
}
const savePlace = async (req, res) => {
    const { place } = req.body;
    const preparingPlace = new placeModel(place);
    const response = await preparingPlace.save();
    res.json({
        "message": (response === preparingPlace) ? "guardado con exito" : "no se pudo realizar accion",
        "response": response
    });
}
const updatePlace = async (req, res) => {
    const { place } = req.body;
    const { _id, ...updatedPlace } = place;
    const response = await placeModel.findOneAndUpdate({ _id: _id }, { $set: { updatedPlace } });
    res.json({
        "message": "actualizado con exito",
        "response": response
    });
}
module.exports = {
    getPlacesNear,
    getPlace,
    savePlace,
    updatePlace
};