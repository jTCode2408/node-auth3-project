const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const Users = require('./user-model');
const { jwtSecret } = require('../config/secrets')

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

router.post('/register', (req, res) => {
    const newUser = req.body
    const hashed = bcrypt.hashSync(newUser.password, 10)
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

router.post('/login', (req, res) => {
    const { username, password } = req.body
    Users.findBy({ username })
        .first()
        .then(user=>{
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = getToken(user);
    
            res.status(200).json({
              LoggedIn: `Hello ${user.username}`,
              token,
            });
          } else {
            res.status(401).json({ errror: "you shall not pass" });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: "unable to login" });
        });
    });


function getToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      role: user.role || "user",
    };
  
    const options = {
      expiresIn: "1h",
    };
  
    return jwt.sign(payload, jwtSecret, options);
  }




module.exports = router;


