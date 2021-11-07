//const updatePlace = async (req, res) => {
//    const { place } = req.body;
//    const { _id, ...updatedPlace } = place;
//    const response = await placeModel.findOneAndUpdate({ _id: _id }, { $set: { updatedPlace } });
//    res.json({
//        "message": "actualizado con exito",
//        "response": response
//    });
//}
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
    res.json(places); {

    }
};
export const createPlace = async (req, res) => {
    const preparedPlace = new Place(req.body);
    const savedPlace = await preparedPlace.save();
    res.status(201).json(savedPlace);
};
export const putPlace = async (req, res) => {
    const { placeId } = req.params;
    if (!placeId) return res.json({
        message: "No ha proporcionado id del lugar"
    });
    const updatedPlace = await Place.findByIdAndUpdate(placeId, req.body, {
        new: true
    });
    if (!updatedPlace) return res.json({
        message: "No existe ese lugar"
    });
    res.json(updatedPlace);
};
export const removePlace = async (req, res) => {
    const { placeId } = req.params;
    if (!placeId) return res.json({
        message: "No ha proporcionado id del lugar"
    });
    const placeDeleted = await Place.findByIdAndRemove(placeId);
    if (!placeDeleted) return res.json({
        message: "No existe ese lugar"
    });
    res.json(placeDeleted);
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

