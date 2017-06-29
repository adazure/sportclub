var express = require("express");
var app = express();
var config = require("./components/config");
var userlogin = require("./components/login")(app);

app.listen(config.port, function() {
    console.log('Sunucu başlatıldı');
})