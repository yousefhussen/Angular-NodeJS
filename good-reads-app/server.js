var express = require('express');
var path = require("path");
var bodyparser = require('body-parser');
var mngo = require("mongoose");

var db =mngo.connect('mongodb://localhost:27017/');

var app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser);


app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");

    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH");

    next();
});

var Schema = mngo.Schema;

var UsersSchema = new Schema({
    name: String,
    email: String,
    password: String
});

var UserModel = mngo.model('Users',UsersSchema);

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/src/index.html'));
});



