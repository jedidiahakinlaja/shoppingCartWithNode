const express =require('express');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const route = require("./route/index");
require("dotenv").config();
const app = express();
app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public")) //css
app.set("views", "./views") //pages
app.set("view engine", "ejs") //choosing ejs template
app.use('/', route);
const PORT =5500;
const HOSTNAME = "localhost";


app.get("/", (req, res) => {
    res.render("index")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

mongoose.set('strictQuery',false);

const MongoAtlas = process.env.MONGO_URL;

mongoose.connect(MongoAtlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})   .then(res => {
        app.listen(PORT, HOSTNAME, () => {
            console.log(`Server is running at ${HOSTNAME}: ${PORT}`)
        });
    })
    .catch(err => console.log(err));

mongoose.set('strictQuery',false);