const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');
const cors = require("cors")
require('dotenv').config();


// init app & middleware
const app = express();
app.use(express.json()) // middleware
app.use(cors({
    origin: "http://localhost:3000"
}))

// db connection
let db;

const port = process.env.PORT || 3001;



connectToDb((err) => {
    if(!err){
        app.listen(port, () => {
            console.log('Server Up :)')
        });
        db = getDb();
    }
});




// routes
app.get('/tasks', (req, res) => {
    let tasks = [];

    db.collection('tasks')
        .find()
        .sort({taskDate: 1}) // returns a cursor toArray forEach
        .forEach(task => tasks.push(task)) // asynch cursor method
        .then(() => {
            res.status(200).json(tasks);
        })
        .catch((err) => {
            res.status(500).json({error: 'Could not fetch the documents'})
        })

})

app.get('/tasks/:date', (req, res) => {
    let tasks = [];
    db.collection('tasks')
        .find({taskDate: req.params.date})
        .forEach(task => tasks.push(task)) // asynch cursor method
        .then(() => {
            res.status(200).json(tasks);
        })
        .catch((err) => {
            res.status(500).json({error: 'Could not fetch the documents'})
        })
})


/*
app.get('/tasks/:id', (req, res) => {

    if(ObjectId.isValid(req.params.id)){
        db.collection('tasks')
            .findOne({_id: ObjectId(req.params.id)})
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({error: 'Could not fetch the document'})
            })
    }
    else
    {
        res.status(500).json({error: 'Not a valid document id'})
    }
})
*/




// Posts Reqests

app.post('/tasks', (req, res) => {
    const task = req.body;

    db.collection('tasks')
        .insertOne(task)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => {
            res.status(500).json({error: 'Could not create a new document'})
        })
})


// Delete
app.delete('/tasks/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        db.collection('tasks')
            .deleteOne({_id: ObjectId(req.params.id)})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({error: 'Could not delete the document'})
            })
    }
    else
    {
        res.status(500).json({error: 'Not a valid document id'})
    }
})

// Patch (Update)
app.patch('/tasks/:id', (req, res) => {
    const updates = req.body // doesn't have to pass all fields, just updated field

    if(ObjectId.isValid(req.params.id)){
        db.collection('tasks')
            .updateOne({_id: ObjectId(req.params.id)}, {$set: updates})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({error: 'Could not update the document'})
            })
    }
    else
    {
        res.status(500).json({error: 'Not a valid document id'})
    }
})