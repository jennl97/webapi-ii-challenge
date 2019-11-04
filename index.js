const server = require('./server');

server.listen(4001, () => {
    console.log('*** Server running on http://localhost:4001 ***');
});