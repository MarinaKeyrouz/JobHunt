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

app.use(cors({ credentials: true, origin: 'http://localhost:4200' }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: "mySecretKey", cookie: { maxAge: 24 * 60 * 60 * 1000 } }));

let jobs = [];

app.listen(3000, () => {
    console.log("Listening on port 3000")
});

// get All jobs
app.get('/jobs', async (request, response) => {
    try {
        const jobs = await Job.find();
        response.json(jobs);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Failed to retrieve jobs' });
    }
});

app.get('/jobs/:jobId', async (request, response) => {
    const jobId = request.params.jobId;
    
    Job.find({ _id: jobId })
        .then(job => {
            if (!job) {
                return response.status(401).json({ message: 'Job not found' });
            }
            response.status(200).json( job );
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Failed to retrieve job' });
        });
});

// get applied jobs from a user
app.get('/user/appliedJobs/:userId', (request, response) => {
    const userId = request.params.userId;
    
    User.findById(userId)
        .then(user => {
            if (!user) {
                return response.status(401).json({ message: 'User not found' });
            }
            const appliedJobs = user.appliedJobs;
            response.status(200).json( appliedJobs );
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Failed to retrieve applied jobs' });
        });
});

// add a new job
app.post('/jobs', (request, response) => {
    const requestJob = request.body;

    const newJob = new Job({
        title: requestJob.title,
        company: requestJob.company,
        location: requestJob.location,
        description: requestJob.description,
        date: requestJob.date,
        appliedUsers: [],
    });

    newJob.save()
        .then(job => {
            response.status(200).json( job );
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Failed to create job' });
        });
});

// add a job application to a user
app.post('/user/appliedJobs/:userId/:jobId', async (request, response) => {
    const userId = request.params.userId;
    const jobId = request.params.jobId;

    User.findOneAndUpdate(
        { _id: userId }, 
        { $push: { appliedJobs: jobId } }
    )
    .then(() => {
        response.status(200).json({ message: 'Job added to user successfully' });
    })
    .catch(error => {
        console.error(error);
        response.status(500).json({ error: 'Failed to add job to user' });
    });
});

app.post('/jobs/appliedUsers/:jobId', async (request, response) => {
    const user = request.session.user;
    const jobId = request.params.jobId;

    Job.findOneAndUpdate(
        { _id: jobId }, 
        { $push: { appliedUsers: user } }
    )
    .then(() => {
        response.status(200).json({ message: 'User added to job application successfully' });
    })
    .catch(error => {
        console.error(error);
        response.status(500).json({ error: 'Failed to add user to job' });
    });
});

app.get('/jobs/appliedUsers/:jobId', async (request, response) => {
    const jobId = request.params.jobId;

    Job.findById(jobId)
        .then(job => {
            if (!job) {
                return response.status(401).json({ message: 'Job not found' });
            }
            const appliedUsers = job.appliedUsers;
            response.status(200).json( appliedUsers );
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Failed to retrieve applied jobs' });
        });
});


app.delete('/user/appliedJobs/:userId', (request, response) => {
    const userId = request.params.userId;
    const jobId = request.session.jobId;

    User.findByIdAndUpdate(userId, { $push: { "appliedJobs": jobId } })
        .then(() => {
            response.status(200).json({ message: 'Job added to user successfully' });
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Failed to add job to user' });
        });
});



// update job
app.put('/jobs/:id', (request, response) => {
    let requestJob = request.body;

    let updatedJob = {
        _id: request.params.id,
        title: requestJob.title,
        company: requestJob.company,
        location: requestJob.location,
        description: requestJob.description,
        date: requestJob.date,
        appliedUsers: requestJob.appliedUsers
    };

    Job.updateOne({ _id: request.params.id }, updatedJob)
        .then(() => {
            response.status(200).json({ message: 'Job updated successfully' });
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Failed to update job' });
        });
});

// delete job
app.delete('/jobs/:id', (request, response) => {
    const jobId = request.params.id;

    Job.findOneAndDelete({ _id: jobId })
        .then(() => {
            response.status(200).json({ message: 'Job deleted successfully' });
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Failed to delete job' });
        });
});

app.post('/user/signin', (request, response) => {
    User.findOne({ email: request.body.email, password: request.body.password })
        .then(user => {
            if (!user) {
                return response.status(401).json({ message: 'Wrong login' });
            }
            request.session.userId = user._id;
            response.status(200).json({ _id: user._id, email: user.email, fullName: user.fullName, isCompany: user.isCompany, appliedJobs: user.appliedJobs, cv: user.cv });
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Failed to sign in' });
        });
});

app.post('/user/signup', (request, response) => {
    var newUser = new User({
        email: request.body.email,
        password: request.body.password,
        fullName: request.body.fullName,
        isCompany: request.body.isCompany,
        appliedJobs: [],
        cv: null,
    });

    User.countDocuments({ email: newUser.email })
        .then(count => {
            if (count > 0) {
                return response.status(409).json({ message: 'This login already exists' });
            } else {
                return newUser.save();
            }
        })
        .then(user => {
            request.session.userId = user._id;
            response.status(200).json({ _id: user._id, email: user.email, fullName: user.fullName, isCompany: user.isCompany, appliedJobs: user.appliedJobs, cv: user.cv });
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Failed to register user' });
        });
});

app.get('/user/signout', (request, response) => {
    new Promise((resolve, reject) => {
        request.session.destroy((error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    })
        .then(() => {
            response.status(200).json({ message: 'Logout successful' });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({ error: 'Failed to sign out' });
        });
});

app.get('/user/isLogged', (request, response) => {
    if (!request.session.userId) {
        return response.status(401).json();
    }

    User.findOne({ _id: request.session.userId })
        .then(user => {
            if (!user) {
                return response.status(401).json({ message: 'User not found' });
            }
            request.session.userId = user._id;
            response.status(200).json({ _id: request.session.userId, email: user.email, fullName: user.fullName, isCompany: user.isCompany, appliedJobs: user.appliedJobs, cv: user.cv });
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'Failed to retrieve user' });
        });
});

// get All companies
app.get('/user/companies', async (request, response) => {
    try {
        const companies = await User.find({ isCompany: true });
        response.json(companies);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Failed to retrieve companies' });
    }
});

// get All companies
app.get('/user', async (request, response) => {
    try {
        const companies = await User.find();
        response.json(companies);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Failed to retrieve companies' });
    }
});
