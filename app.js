const express = require('express');
//const path = require('path');
const mongoose = require('mongoose');
const placesRoutes = require('./routes/places');
const usersRoutes = require('./routes/users');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./www'));

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

/*
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});*/

mongoose.connect('mongodb://localhost:27017/WTE', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("database conected!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});