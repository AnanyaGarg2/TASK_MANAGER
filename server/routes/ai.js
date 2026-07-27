const express = require("express")

const router = express.Router()

const Groq = require("groq-sdk")

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})
console.log(process.env.GROQ_API_KEY)

router.post("/", async (req, res) => {

  try {

    const { message } = req.body

    const chatCompletion =
      await groq.chat.completions.create({

        messages: [
          {
            role: "system",
            content:
              "You are a smart AI study assistant helping students learn efficiently.",
          },

          {
            role: "user",
            content: message,
          },
        ],

        model: "llama-3.1-8b-instant",

      })

    res.json({
      reply:
        chatCompletion.choices[0]
        ?.message?.content,
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: "AI failed",
    })
  }
})

module.exports = router