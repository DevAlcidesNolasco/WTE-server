import { Schema, model } from "mongoose"
const socialMediaSchema = new Schema({
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
const contactSchema = new Schema({
    socialMedia: [socialMediaSchema],
    telephone: [String]
});
const locationSchema = new Schema({
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
const ratingScheme = new Schema({
    user: String,
    rate: Number
});
const workDays = new Schema({
    interval: String | [String],
    from: String,
    to: String
});
const placeSchema = new Schema({
    category: {
        type: [String],
        required: [true, "No se proporcionó categoria"]
    },
    contact: contactSchema,
    description: String,
    gallery: [String],
    ubication: String,
    location: locationSchema,
    name: {
        type: String,
        required: [true, "No se proporcionó nombre"]
    },
    rating: [ratingScheme],
    schedule: [workDays]
});
const placeModel = model("Place", placeSchema);
placeModel.createIndexes({ location: "2dsphere" });
export default placeModel;