// just a really simple server to serve the static files in the current directory

// static file server
import express from 'express';
import path from 'path';

const port = 3000;

express()
    .use(express.static("."))
    .listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
