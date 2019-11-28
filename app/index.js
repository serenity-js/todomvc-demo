const port = 3000;

require('./server')
    .listen(port, () => console.log(`Server started on port ${ port }`));
