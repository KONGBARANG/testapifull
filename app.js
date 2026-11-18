const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Sample data
let users = [
    { id: 1, name: "Dara" },
    { id: 2, name: "Sok" },
    { id: 3, name: "Makara" }
];

// GET - Read all users
app.get('/users', (req, res) => {
    res.json(users);
});

// GET - Read user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

// POST - Create new user
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name: req.body.name
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT - Update user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name;
    res.json(user);
});

// DELETE - Delete user
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userExists = users.some(u => u.id === id);

    if (!userExists) {
        return res.status(404).json({ message: "User not found" });
    }

    users = users.filter(u => u.id !== id);
    res.json({ message: "User deleted successfully" });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});