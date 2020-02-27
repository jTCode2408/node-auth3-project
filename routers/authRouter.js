const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const Users = require('./user-model');


router.get('/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error:"you shall not pass"})
    })
})

router.get('/register', (req, res) => {
    const newUser = req.body
    const hashed = bcrypt.hashSync(user.password, 10)
        newUser.password = hashed
    
    Users.add(newUser)
        .then(adding => {
            res.status(201).json(adding)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "unable to register new user" })
    })
})

router.get('/login', (req, res) => {
    const { username, password } = req.body
    Users.findBy({ username })
        .first()
        .then()
        .catch(err => {
            console.log(err)
            res.status(500).json({error:"you shall not pass"})
    })
})













module.exports = router;


