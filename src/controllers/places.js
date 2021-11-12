import Place from "../models/places";
export const getPlaces = async (req, res) => {
    let { distance } = req.body;
    distance = distance ? distance : 300;
    const { coordinates } = req.body;
    if (!coordinates) return res.json({
        message: "No ha proporcionado ubicacion"
    });
    const { lat, lng } = coordinates;
    //const { filters } = req.body;
    //if (!filters) return 
    //const { starsAbove } = filters;
    //console.log(starsAbove);
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
        //category
    });
    res.json(places);
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
    if (!placeId.match(/^[0-9a-fA-F]{24}$/)) return res.json({
        message: "El id del lugar no es valido"
    });
    const updatedPlace = await Place.findByIdAndUpdate(placeId, { $set: req.body }, { new: true });
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
    if (!placeId.match(/^[0-9a-fA-F]{24}$/)) return res.json({
        message: "El id del lugar no es valido"
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
    if (!placeId.match(/^[0-9a-fA-F]{24}$/)) return res.json({
        message: "El id del lugar no es valido"
    });
    const placeFound = await Place.findById(placeId);
    if (!placeFound) return res.json({
        message: "No existe ese lugar"
    });
    res.json(placeFound);
};