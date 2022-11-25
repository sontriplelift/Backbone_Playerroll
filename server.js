var express = require('express')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playerroll')

var Schema = mongoose.Schema

var PlayerSchema = new Schema({
    author: String,
    title: String,
    url: String
})

mongoose.model('Player', PlayerSchema)

var Player = mongoose.model('Player')

var player = new Player({
    name: 'Kevin',
    age: 31,
    gender: 'Male'
})

player.save()

var app = express()

app.use(express.static(__dirname + '/public'))

var port = 3003

app.listen(port)
console.log('server on ' + port)