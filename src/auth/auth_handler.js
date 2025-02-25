const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 
const JWT_SECRET = process.env.SECRET;

async function RegisterHandler(req, res) {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        console.log(email)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            role: "user",
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'Success' });

    } catch (err) {
        console.error('Error registering user', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function LoginHandler(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Email does not exist' });
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Wrong password' });
        }

        const token = jwt.sign(
            { email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,   // Secure against XSS attacks
            maxAge: 3600000   // 1 hour
        });

        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function LogOut(req, res) {
    res.clearCookie("token"); 
    res.status(200).json({ message: "Logged out successfully" });
}


async function ProfileHandler (req, res) {
    try {
        const userEmail = req.user.email;
        const user = await User.findOne({ email: userEmail }, 'first_name last_name email');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { RegisterHandler, LoginHandler, ProfileHandler, LogOut };
