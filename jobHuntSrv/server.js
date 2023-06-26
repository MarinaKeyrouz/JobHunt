const express = require('express');
const session = require('express-session');
const app = express();

var cors = require('cors')
var bodyParser = require('body-parser')
const mongoose = require('mongoose');

const Job = require('./models/job');
const User = require('./models/user');

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
app.use(session({secret: "mySecretKey", cookie: {maxAge: 24 * 60 * 60 * 1000}}));

let jobs = [];

app.listen(3000, () => {
    console.log("Listening on port 3000")
});

app.get('/jobs', (request, response) => {
    Job.find((error, jobs) => {
        if (error) return console.error(err);
        response.json(jobs);
    })
});

app.post('/jobs', (request, response) => {
    let requestJob = request.body;

    let newJob = new job({
        title: requestJob.title,
        company: requestJob.company,
        location: requestJob.location,
        description: requestJob.description,
        date: requestJob.date
    });

    newJob.save((error, job) => {
        if (error) return console.error(err);
        console.log(job);
        response.json(job);
    })
})

app.put('/jobs/:id', (request, response) => {
    let requestJob = request.body;

    let newJob = new Job({
        _id: request.params.id,
        title: requestJob.title,
        company: requestJob.company,
        location: requestJob.location,
        description: requestJob.description,
        date: requestJob.date
    })
})

app.delete('/jobs/:id', (request, response) => {
    Job.deleteOne({_id:request.params.id}, (error) => {
        if (error) return response.status(400).json({error: error});
        response.status(201).json({msg: "ok"});
    });
})

app.post('/signin', (request, response) => {
    User.findOne( {login: request.body.email, password: request.body.password}, (error, user) => {
        if (error) return response.status(401).json({msg: "Error"});
        if (!user) return response.status(401).json({msg: "Wrong login"});
        request.session.userId = user._id;
        response.status(200).json({login: user.login, fullName: user.fullName, isCompany: user.isCompany})
    })
})

app.post('/register', (request, response) => {
    var newUser = new User({
        email: request.body.email,
        password: request.body.password,
        fullName: request.body.fullName,
        isCompany: request.body.isCompany,
    });

    User.countDocuments({login: newUser.login}, function (err, count) {
        if (err) return response.status(401).json({msg: "Error"});
        if (count > 0) {
            return response.status(409).json({msg: "This login already exists"});
        } else {
            newUser.save((error, user) => {
                if (error) return console.error(err);
                request.session.userId = user._id;
                response.status(200).json({email: user.email, fullName: user.fullName, isCompany: user.isCompany});
            });
        }
    })

})

app.get('/signout', (request, response) => {
    request.session.destroy(error => {
        if (error) return response.status(409).json({msg: "error"});
        response.status(200).json({msg: "Logout Ok"});
    });
})

app.get('/isLogged', (request, response) => {
    if (!request.session.userId) return res.status(401).json();

    User.findOne( {_id: request.session.userId}, (error, user) => {
        if (error) return response.status(401).json({msg: "Error"});
        if (!user) return response.status(401).json({msg: "Error"});
        request.session.userId = user._id;
        response.status(200).json({email: user.email, fullName: user.fullName, isCompany: user.isCompany})
    })
})


