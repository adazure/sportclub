module.exports = {

    // MONGODB bağlantı cümlesi
    mongodb: 'mongodb://localhost:27017/dbSportClub',

    // Sunucu bağlantı portu
    port: process.env.port || 1453,

    // Oturum bilgisi
    session_secret: 'application_sport'
}