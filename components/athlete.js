var urls = require("./urls");
var actions = require("./actions");

module.exports = function(app) {

    app.get(urls.athlete_all, actions.checkUser, function(req, res) {
        res.send('Tüm sporcular getirildi');
    });

    app.post(urls.athlete_new, actions.checkUser, function(req, res) {
        res.send({ message: 'Sporcu yüklendi', data: req.body.data });
    });

}