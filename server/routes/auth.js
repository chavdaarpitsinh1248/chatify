const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }


    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const emailNormalized = email.toLowerCase();
        const existingUser = await User.findOne({
            $or: [{ email: emailNormalized }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }


        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User registered",
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (err) {
        res.status(400).json({ error: "Registration failed" });
    }
});

/* LOGIN */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const emailNormalized = email.toLowerCase();
    const user = await User.findOne({ email: emailNormalized }).select("+password");
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
        { id: user._id, email: user.email, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );


    res.json({
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });

});

module.exports = router;