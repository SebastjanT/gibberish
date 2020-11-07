const express=require('express');
const createError=require('http-errors');
const path=require('path');

const server=express();

const port= process.env.PORT || 8080;

server.use(express.static(path.join(__dirname, 'gibberish-front', 'build')));

server.get(/(\/login)/, (req, res, next) => {
    res.sendFile(path.join(__dirname, 'gibberish-front', 'build', 'index.html'));
});

server.use(function(req, res, next) {
    next(createError(404, 'Nah ah'));
});

server.listen(port, () => 
    console.log(`Server ready at port: ${port}`)
);

module.exports=server;