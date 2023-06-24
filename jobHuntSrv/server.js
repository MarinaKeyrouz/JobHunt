const express = require('express');
const app = express();
var cors = require('cors')
var bodyParser = require('body-parser')

const mongoose = require('mongoose');

const Note = require('./models/job');

//3.3

mongoose.connect('mongodb+srv://myuser:a2312001@cluster0.oionivu.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to DB!');
    })
    .catch((error) => {
        console.log('Unable to connect to DB!');
        console.error(error);
    });

app.use(cors({credentials: true, origin: 'http://localhost:4200'}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let jobs = [];

app.get('/jobs', (request, response) => {
    response.json({data: jobs})
})
