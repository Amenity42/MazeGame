// Server to host the game

//creater server  and listen on port ****
const port = 8080;
var express = require('express');
var app = express();
var server = app.listen(port);

app.use(express.static('public'));

app.listen(3000, ()=>{
      console.log(`listening on ${port}`);
});

