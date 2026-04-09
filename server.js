require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
});

// Create order API
app.post("/create-order", async (req, res) => {
    try {
        const { amount } = req.body;

        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR"
        });

        res.json(order);
    } catch (err) {
        res.status(500).send("Error creating order");
    }
});

// Payment verify (IMPORTANT)
app.post("/verify-payment", (req, res) => {
    res.json({ status: "ok" }); // basic (upgrade later)
});

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server running on port${PORT}`));