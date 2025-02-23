require('dotenv').config();
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const verifyToken = require('./middlewares/authMiddleware'); // Middleware

const app = express();
const JWT_SECRET = process.env.SECRET;
const MongoURL = process.env.MongoURL;

// Connect to MongoDB
mongoose.connect(MongoURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true, required: true },
    password: String
});

// User Model
const User = mongoose.model("User", userSchema, "users");

app.use(express.static('web'))
app.use(express.json());

app.get("/sign-up", (req, resp) =>{
    resp.sendFile(path.join(__dirname, "../",'web', 'sign-up.html'));
})
app.get("/login", (req, resp) =>{
    resp.sendFile(path.join(__dirname, "../",'web', 'login.html'));
})
app.get("/profile", (req, resp) =>{
    resp.sendFile(path.join(__dirname, "../",'web', 'profile.html'));
})

// Register Endpoint
app.post("/api/register", async (req, resp) => {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return resp.status(400).json({ error: 'All fields are required' });
    }

    try {
        console.log(email)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return resp.status(400).json({ error: "Email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        resp.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error('Error registering user', err);
        resp.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login Endpoint
app.post("/api/login", async (req, resp) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return resp.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return resp.status(401).json({ error: 'Email does not exist' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return resp.status(401).json({ error: 'Wrong password' });
        }

        const token = jwt.sign(
            { email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        resp.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Error during login', error);
        resp.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile Info Endpoint
app.get('/api/profile/info', verifyToken, async (req, res) => {
    try {
        const userEmail = req.email;
        const user = await User.findOne({ email: userEmail }, 'first_name last_name email');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(8080, () => {
    console.log("Server running at http://localhost:8080/");
});
