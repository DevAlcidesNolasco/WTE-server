const express = require('express');
const router = express.Router();
const placeModel = require('../models/places');

router.get('/', async (req, res) => {
    const places = await placeModel.find();
    res.json({
        "messaje": "get all places",
        "response": places
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

module.exports = router;