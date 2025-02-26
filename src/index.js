require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares/authMiddleware');
const qrCodeApi = require('./QR-code/qr-code');
const authRoutes = require('./auth/auth_handler'); 
const BmiHandler = require('./bmi/bmi')
const MailHandler = require('./nodemailer/mailer');
const WeatherHandler = require('./Weather/weather_handler');


const BlogRoutes = require('./posts/post_handler')
const UserRoutes = require('./users/user_handler')

const app = express();
const PORT = process.env.PORT || 8080;
const MongoURL = process.env.MongoURL;



mongoose.connect(MongoURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Middleware

app.use(express.static('web'));
app.use(express.json()); 
app.use(cookieParser());


// Frontend
const pages = ['sign-up', 'login'];
pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(__dirname, '../', 'web', `${page}.html`));
    });
});

const authpages = ['profile', 'qr-code', 'mailing', 'bmi', 'weather', 'blogs'];
authpages.forEach(page => {
    app.get(`/${page}`, middlewares.verifyToken, (req, res) => {
        res.sendFile(path.join(__dirname, '../', 'web', `${page}.html`));
    });
});

app.get(`/admin`, middlewares.verifyToken, middlewares.verifyRole("admin"), (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'web', `admin.html`));
});

// Auth
app.post('/api/register', authRoutes.RegisterHandler);
app.post('/api/login', authRoutes.LoginHandler);
app.get('/api/profile/info', middlewares.verifyToken, authRoutes.ProfileHandler);
app.post('/api/logout', middlewares.verifyToken, authRoutes.LogOut)


// QR-code
app.get('/api/qrcode', middlewares.verifyToken, qrCodeApi); 

// NodeMailer
app.post('/api/mail', middlewares.verifyToken, MailHandler)

// BMI 
app.get('/api/bmi', middlewares.verifyToken, BmiHandler)

// Weather
// https://www.weatherapi.com/
app.get('/api/weather', middlewares.verifyToken, WeatherHandler);


// Crud for blogs
app.post("/api/blogs", BlogRoutes.PostBlog)
app.get("/api/blogs", BlogRoutes.GetBlogs)
app.get("/api/blogs/:id", BlogRoutes.GetBlogById)
app.put("/api/blogs/:id", BlogRoutes.UpdateBlog)
app.delete("/api/blogs/:id", BlogRoutes.DeleteBlog)


// Crud for users
app.get('/api/users', middlewares.verifyToken, middlewares.verifyRole("admin"), UserRoutes.getUsers);
app.get('/api/users/:id', middlewares.verifyToken, UserRoutes.getUserById);
app.put('/api/users/:id', middlewares.verifyToken, UserRoutes.updateUser);
app.delete('/api/users/:id', middlewares.verifyToken, middlewares.verifyRole("admin"), UserRoutes.deleteUser);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
