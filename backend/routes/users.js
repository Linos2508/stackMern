const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res) => {
    let response = {
        "result":0,
        "data": [],
        "error": ""
    }
    User.find()
    .then(users => {
        response["data"] = users;
        response["result"] = 1;
        res.json(response);
    })
    .catch(err => {
        response["error"] = err;
        res.status(400).json(response);
    });
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const newUser = new User({username});
    let response = {
        "result":0,
        "data": {},
        "error": ""
    }
    newUser.save()
    .then(docInserted => {
        response["data"] = {
            "_id": docInserted["_id"]
        }
        response["result"] = 1
        res.json(response)
    })
    .catch(err => {
        response["error"] = err
        res.status(400).json(response)
    });
});

module.exports = router;