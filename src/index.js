require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const verifyToken = require('./middlewares/authMiddleware');
const qrCodeApi = require('./QR-code/qr-code');
const authRoutes = require('./auth/auth_handler'); 
const BmiHandler = require('./bmi/bmi')
const MailHandler = require('./nodemailer/mailer');
const WeatherHandler = require('./Weather/weather_handler');


const app = express();
const PORT = process.env.PORT || 8080;
const MongoURL = process.env.MongoURL;



mongoose.connect(MongoURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.static('web'));
app.use(express.json()); 

// Frontend
const pages = ['sign-up', 'login', 'profile', 'qr-code', 'mailing', 'bmi', 'weather', 'admin'];
pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(__dirname, '../', 'web', `${page}.html`));
    });
});


// Auth
app.post('/api/register', authRoutes.RegisterHandler);
app.post('/api/login', authRoutes.LoginHandler);
app.get('/api/profile/info', verifyToken, authRoutes.ProfileHandler);

// QR-code
app.get('/api/qrcode', qrCodeApi); 

// NodeMailer
app.post('/api/mail', MailHandler)

// BMI 
app.get('/api/bmi', BmiHandler)

// Weather
// https://www.weatherapi.com/
app.get('/api/weather', WeatherHandler);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
