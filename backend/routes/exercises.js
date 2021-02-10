const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req,res) => {
    let response = {
        "result":0,
        "data": [],
        "error": ""
    }
    Exercise.find()
    .then(exercises => {
        response["data"] = exercises;
        response["result"] = 1;
        res.json(response)
    })
    .catch(err => {
        response["error"] = err;
        res.status(400).json(response);
    });
});

router.route('/add').post((req,res) => {
    let response = {
        "result":0,
        "data": {},
        "error": ""
    }
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({username,description,duration,date});

    newExercise.save()
    .then(docInserted => {
        response["data"] = {
            "_id": docInserted["_id"]
        }
        response["result"] = 1
        res.json(response)
    })
    .catch(err => {
        response["error"] = err;
        res.status(400).json(response);
    });
});

router.route('/:id').get((req,res) => {
    let response = {
        "result":0,
        "data": {},
        "error": ""
    }
    Exercise.findById(req.params.id)
    .then(exercise => {
        response["data"] = exercise;
        response["result"] = 1
        res.json(response)
    })
    .catch(err => {
        response["error"] = err;
        res.status(400).json(response);
    });
})

router.route('/:id').delete((req,res) => {
    let response = {
        "result":0,
        "data": {},
        "error": ""
    }
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => {
        response["result"] = 1
        res.json(response);
    })
    .catch(err => {
        response["error"] = err;
        res.status(400).json(response);
    });
})

router.route('/:id').put((req,res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
        exercise.save()
        .then(() => {
            response["result"] = 1
            res.json(response);
        })
        .catch(err => {
            response["error"] = err;
            res.status(400).json(response);
        });
    })
    .catch(err => {
        response["error"] = err;
        res.status(400).json(response);
    });
})

module.exports = router;