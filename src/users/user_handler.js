const User = require('../models/userModel'); 

async function getUsers(req, res) {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id, '-password'); 

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (req.user.email !== "admin@admin.com" && req.user.email !== user.email) {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateUser(req, res) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (req.user.email !== "admin@admin.com" && req.user.email !== user.email) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const { first_name, last_name, email } = req.body;
        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.email = email || user.email;

        await user.save();
        res.json({ message: 'User updated successfully' });

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteUser(req, res) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getUsers, getUserById, updateUser, deleteUser };
