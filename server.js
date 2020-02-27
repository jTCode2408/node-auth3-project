const express = require('express');
const helmet = require('helmet')
const cors = require('cors');
const Router = require ('./routers/authRouter')
const restricted = require('./middleware');

const server = express();


server.use(express.json())
server.use(helmet());
server.use(cors());



server.use('/api', Router)

server.get('/', (req, res) => {
    res.send('Server start')
})





module.exports = server;

// function getRole(role) {
//     return (req, res, next) => {
//       if (
//         req.decodedToken &&
//         req.decodedToken.role &&
//         req.decodedToken.role.toLowerCase() === role
//       ) {
//         next();
//       } else {
//         res.status(403).json({ you: "shall not pass!" });
//       }
//     };
//   }