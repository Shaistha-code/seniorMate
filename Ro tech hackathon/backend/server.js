const express = require('express');
const fetch = require('node-fetch'); // <- this is now working
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    console.log("User message:", message);

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }]
            })
        });

        const data = await response.json();

        if (!data.choices || !data.choices[0]) {
            console.error("Invalid response from OpenAI:", data);
            return res.status(500).json({ reply: 'Invalid response from OpenAI.' });
        }

        res.json({ reply: data.choices[0].message.content });
    } catch (err) {
        console.error("OpenAI API Error:", err);
        res.status(500).json({ reply: 'Something went wrong.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
