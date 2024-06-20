const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();
const apiKey = "AIzaSyB3u6abzI7iH40rtWgtp0L4I_p-1ej401g";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define route
router.get('/gen', async (req, res) => {
    try {
        const { ask } = req.query;

        const result = await model.generateContent(ask);
        const response = await result.response;
        const text = await response.text();

        res.json({ result: text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
