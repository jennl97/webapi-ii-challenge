const express = require('express');
const dbRouter = require('./data/db-router');

const server = express();

server.use(express.json());

server.use('/api', dbRouter);

server.get('/', (req, res) =>{
    res.send(`
        <h2>Web API II Challenge</h2>
        <p>Jenn's attempt 1</p>
        `);
});

module.exports = server;
