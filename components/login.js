// Namespace
var mongoose = require("mongoose");
var passport = require("passport");
var status = require("./status");
var urls = require("./urls");
var config = require("./config");
var actions = require("./actions");
var LocalStrategy = require('passport-local').Strategy;




module.exports = function(app) {


    // Kullanıcı adı ve şifrenizi kontrol eden yordam
    passport.use(new LocalStrategy({
            usernameField: '_username',
            passwordField: '_password',
        },
        actions.loginRedirect
    ));



    //...................................................................................\\


    // Oturum sağlanırken, kullanıcı bilgilerinin serialize/deserialize işlemleri

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(id, done) {
        done(null, { name: "kerem" });
    });




    //...................................................................................\\




    // Middleware ayarları
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(require('express-session')({ secret: config.session_secret, resave: true, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());




    //...................................................................................\\





    // Kullanıcı oturum açmak istediğinde kullanıcı bilgilerini sorgular
    app.post(urls.user_login, passport.authenticate('local', { failureRedirect: urls.user_session_error }), function(req, res) {
        res.redirect(urls.user_success);
    });




    //...................................................................................\\



    // Kullanıcı oturumunu kapatır
    app.get(urls.user_logout, actions.checkUser, function(req, res) {
        req.session.destroy(function(err) {
            res.redirect(urls.user_bye);
        });
    });




    //...................................................................................\\



    // Kullanıcı oturum kapatılma sonuç sayfası
    app.get(urls.user_bye, function(req, res) {
        res.send(status.x9001);
    });




    //...................................................................................\\



    // Kullanıcı oturum açıldığına dair sonuç sayfası
    app.get(urls.user_success, function(req, res) {
        res.send(status.x9002);
    });



    //...................................................................................\\



    // Kullanıcı bilgileri hatalıysa

    app.get(urls.user_session_error, function(req, res) {
        res.send(status.x9003);
    });




    //...................................................................................\\



    // Üyenin üyeliği sonlandırıldıysa gösterilecek sayfa
    app.get(urls.user_membership_expired, function(req, res) {
        res.send(status.x9004);
    });



    //...................................................................................\\




    // Üyelik kaydı alındıktan sonra eğer aktivasyon işlemleri yapılmışsa ve kullanıcı hesabını onaylamamışsa bu sayfa gösteriliyor
    app.get(urls.user_activation, function(req, res) {
        res.send(status.x9005);
    });




    //...................................................................................\\



    // Kullanıcı oturumu zaman aşımına uğradıysa; yani kapatıldıysa
    app.get(urls.user_session_expired, function(req, res) {
        res.send(status.x9006);
    });




    //...................................................................................\\



    // Kullanıcının o an ki oturum durumunu verir
    app.get(urls.user_status, function(req, res) {
        res.send(!req.isAuthenticated() ? status.x9006 : status.x9007);
    });


}