const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    email: String,
    telephone: [String]
});
const ubicationSchema = mongoose.Schema({
    lat: Number,
    lng: Number
});
const locationSchema = mongoose.Schema({
    description: String,
    ubication: ubicationSchema
});
const ratingScheme = mongoose.Schema({
    user: String,
    rate: Number
});
const workDays = mongoose.Schema({
    from: String,
    to: String
});
const placeSchema = mongoose.Schema({
    category: [String],
    contact: contactSchema,
    description: String,
    gallery: [String],
    location: locationSchema,
    name: String,
    rating: [ratingScheme],
    schedule: {
        weekday: workDays,
        weekend: workDays
    }
});
module.exports = mongoose.model("Place", placeSchema);