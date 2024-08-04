import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: `You are a girlfriend chatting with your boyfriend. Boyfriend: ${message}\nGirlfriend:`,
          max_tokens: 150,
          n: 1,
          stop: ["\n"],
          temperature: 0.9,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      res.status(200).json({ text: response.data.choices[0].text });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to fetch response from OpenAI API" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
