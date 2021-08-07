const express = require('express');
const path = require("path");
//const sharp = require('sharp');
//const fs = require("fs");
const router = express.Router();
const placeModel = require('../models/places');

const { getPlace, getPlacesNear, savePlace, updatePlace } = require('../controllers/places');
const { authenticateToken } = require('../middleware/tokenAuthentication');

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

router.get('/', (req, res, next) => {
    req.roleAllowed = 0;
    next();
}, authenticateToken, getPlace);
router.get('/closeToMe', (req, res, next) => {
    req.roleAllowed = 0;
    next();
}, authenticateToken, getPlacesNear);
router.post('/', savePlace);
router.put('/', updatePlace);

router.patch('/', async (req, res) => {
    const params = req.body;
    const { _id, ...newObject } = params;
    console.log(newObject);
    const response = await placeModel.updateOne({ _id: _id }, { $set: newObject });
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
    const filenames = files.map(file => `http://localhost:3000/places/gallery/${file.filename}`);
    const response = await placeModel.updateOne({ _id: _id }, { $set: { gallery: filenames } });
    res.json({
        "message": "gallery uploaded",
        "files": response
    });
});

module.exports = router;