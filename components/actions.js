var urls = require("./urls");

module.exports = {

    // Kullanıcının oturumunun açık olup olmadığını kontrol eden method
    checkUser: function(req, res) {
        if (req.isAuthenticated())
            next();
        else
            res.redirect(urls.user_session_expired);
    },



    //...................................................................................\\




    // Login olurken kullanıcı adı ve şifre kontrolu yapalım
    loginRedirect: function(_username, _password, done) {
        if (_username === 'kerem' && _password === 'yavuz') {
            return done(null, { name: 'kerem yavuz', email: 'kermeix@res.com' });
        } else {
            return done(null, false);
        }
    }

}