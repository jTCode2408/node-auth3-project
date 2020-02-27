const express = require('express');
const helmet = require('helmet')
const cors = require('cors');
const Router = require ('./routers/authRouter')
const server = express();

server.use(express.json())
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Server start')
})


server.use('/api', Router)


module.exports = server;