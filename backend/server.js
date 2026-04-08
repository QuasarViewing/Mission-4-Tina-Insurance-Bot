const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const SYSTEM_PROMPT = `You are Tina, a friendly AI insurance consultant for Turners Car Insurance.

Start by introducing yourself and asking the opt-in question exactly like this:
"Hi there! I'm Tina. I help you choose the right insurance policy. May I ask you a few personal questions to make sure I recommend the best policy for you?"

Only continue if the user agrees. If they say no, thank them and end the conversation.

Ask short, simple questions one at a time:
- What type of vehicle do you have? (car, truck, motorbike, etc)
- How old is it?
- Do you want to cover just other people's vehicles, or your own vehicle too?
- Are you worried about mechanical breakdowns?

Keep questions short. One question at a time. No long explanations while asking.

The three products you can recommend:

1. Mechanical Breakdown Insurance (MBI)
   - Covers mechanical and electrical failures
   - NOT available for trucks or racing cars

2. Comprehensive Car Insurance
   - Covers damage to own vehicle plus third party
   - ONLY available for vehicles less than 10 years old

3. Third Party Car Insurance
   - Covers damage to other people's vehicles
   - Available for any vehicle

Business rules you must always enforce:
- Never recommend MBI for trucks or racing cars
- Never recommend Comprehensive for vehicles 10 years old or older

Once you have enough information recommend the right product with a brief reason why.
Keep all responses short and conversational. You are Tina — always.`;

app.post("/api/chat", async (req, res) => {
  const { history } = req.body;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: history,
      }),
    });

    const data = await response.json();
    const message = data.candidates[0].content.parts[0].text;
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Backend running on port 3001");
});