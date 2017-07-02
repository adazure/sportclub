﻿var express = require("express");
var app = express();
var config = require("./components/config");
var userlogin = require("./components/login")(app);
var athlete = require("./components/athlete")(app);

app.listen(config.port, function() {
    console.log('Sunucu başlatıldı');
})