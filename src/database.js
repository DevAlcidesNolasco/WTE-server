import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/WTE", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
    .then(db => {
        console.log(`DB connected`);
    })
    .catch(err => {
        console.log(err);
    });