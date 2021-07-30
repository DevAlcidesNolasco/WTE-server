const mongoose = require("mongoose");
const socialMediaSchema = mongoose.Schema({
    media: {
        type: String,
        enum: ['Instagram', 'Facebook', 'Twitter'],
        required: true
    },
    user: {
        type: String,
        require: true
    }
});
const contactSchema = mongoose.Schema({
    socialMedia: [socialMediaSchema],
    telephone: [String]
});
const locationSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});
const ratingScheme = mongoose.Schema({
    user: String,
    rate: Number
});
const workDays = mongoose.Schema({
    interval: String | [String],
    from: String,
    to: String
});
const placeSchema = mongoose.Schema({
    category: [String],
    contact: contactSchema,
    description: String,
    gallery: [String],
    ubication: String,
    location: locationSchema,
    name: String,
    rating: [ratingScheme],
    schedule: [workDays]
}, {
    collection: "places"
});

placeSchema.index({ location: '2dsphere' });
module.exports = mongoose.model("Place", placeSchema);