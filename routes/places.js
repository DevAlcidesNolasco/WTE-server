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
    const response = (_id) ? await placeModel.findById(_id) : await placeModel.find();
    res.json({
        "messaje": "get all places",
        "response": response
    });
});

router.post('/', async (req, res) => {
    const params = req.body;
    const place = new placeModel({
        category: params.category,
        contact: params.contact,
        description: params.description,
        gallery: params.gallery,
        location: params.location,
        name: params.name,
        rating: params.rating,
        schedule: params.schedule
    });
    const response = await place.save();
    res.json({
        "message": "posting to places",
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