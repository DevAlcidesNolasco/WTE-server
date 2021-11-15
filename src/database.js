import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017", {
    dbName: "WTE",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: true,
    useCreateIndex: true
}).then(db => {
    console.log(`DB connected`);
}).catch(err => {
    console.log(err);
});