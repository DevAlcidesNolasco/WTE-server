//const express = require('express');
//const mongoose = require('mongoose');
//const placesRoutes = require('./routes/places');
//const usersRoutes = require('./routes/users');
//const app = express();
//const port = 3000;
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(express.static('./www'));
//app.use('/places/gallery', express.static('./assets/uploads/places'));
//app.use('/users/photo', express.static('./assets/uploads/users'));
//app.use('/api/places', placesRoutes);
//app.use('/api/users', usersRoutes);
////console.log(require('crypto').randomBytes(64).toString('hex'));
//mongoose.connect('mongodb://localhost:27017/WTE', { useNewUrlParser: true, useUnifiedTopology: true });
//const db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function () {
//    console.log("database conected!");
//});
//app.listen(port, () => {
//    console.log(`Example app listening at http://localhost:${port}`);
//});

import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import placesRoutes from "./routes/places"
const app = express();
app.set("pkg", pkg);
app.use(morgan("dev"));
app.use(express.json());
app.get("/", (req, res) => {
    res.json({
        author: app.get("pkg").author,
        name: app.get("pkg").name,
        description: app.get("pkg").description,
        version: app.get("pkg").version,
    });
});
app.use("/api/places", placesRoutes);
export default app;