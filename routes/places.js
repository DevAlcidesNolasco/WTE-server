const express = require('express');
const path = require("path");
//const sharp = require('sharp');
//const fs = require("fs");
const router = express.Router();
const placeModel = require('../models/places');
const multer = require('multer');
const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./assets/uploads/places");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: fileStorage });

router.get('/', async (req, res) => {
    const { _id } = req.body;
    const { distance, coordinates } = req.body;
    const response = (_id) ? await placeModel.find({ _id: _id }) : await placeModel.find({
        location: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [
                        coordinates.lat,
                        coordinates.lng
                    ]
                },
                $maxDistance: (distance) ? distance : 500
            }
        }
    });
    res.json({
        "messaje": (_id) ? "Se encontró el sitio que buscabas" : "Encontramos estos lugares cercanos a tí",
        "response": response
    });
});

router.post('/', async (req, res) => {
    const { place } = req.body;
    const preparingPlace = new placeModel(place);
    const response = await preparingPlace.save();
    const message = (response !== null) ? "guardado con exito" : "no se pudo realizar accion";
    res.json({
        "message": message,
        "response": response
    });
});

router.put('/', async (req, res) => {
    const params = req.body;
    const newPlace = {
        category: params.category,
        contact: params.contact,
        description: params.description,
        gallery: params.gallery,
        location: params.location,
        name: params.name,
        rating: params.rating,
        schedule: params.schedule
    };
    const response = await placeModel.findOneAndUpdate({ _id: params._id }, { $set: newPlace }, { new: true, useFindAndModify: false });
    res.json({
        "message": "updating a place",
        "response": response
    });
});

router.patch('/', async (req, res) => {
    const params = req.body;
    const { _id, ...newObject } = params;
    console.log(newObject);
    const response = await placeModel.updateOne({ _id: params._id }, { $set: newObject });
    res.json({
        'message': 'patchin place',
        'response': response
    });
});

router.delete('', (req, res) => {

});

router.post('/gallery', upload.array("gallery"), async (req, res) => {
    const { _id } = req.body;
    const { files } = req;
    const filenames = files.map(file => `http:/localhost:3000/places/gallery/${file.filename}`);
    const response = await placeModel.updateOne({ _id: _id }, { $set: { gallery: filenames } });
    res.json({
        "message": "gallery uploaded",
        "files": response
    });
});

module.exports = router;