import express from "express";
import { createServer as createViteServer } from "vite";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // NVIDIA NIM Inference Endpoint
  app.post("/api/chat/nvidia", async (req, res) => {
    const { messages, stream = false } = req.body;

    if (!process.env.NVIDIA_API_KEY) {
      return res.status(500).json({ error: "NVIDIA_API_KEY is not configured" });
    }

    const openai = new OpenAI({
      apiKey: process.env.NVIDIA_API_KEY,
      baseURL: "https://integrate.api.nvidia.com/v1",
    });

    try {
      if (stream) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const completion = (await openai.chat.completions.create({
          model: "nvidia/nvidia-nemotron-nano-9b-v2",
          messages: messages,
          temperature: 0.6,
          top_p: 0.95,
          max_tokens: 2048,
          stream: true,
          // @ts-ignore
          extra_body: {
            min_thinking_tokens: 1024,
            max_thinking_tokens: 2048
          }
        } as any)) as any;

        for await (const chunk of completion) {
          const reasoning = (chunk.choices[0]?.delta as any)?.reasoning_content;
          const content = chunk.choices[0]?.delta?.content || "";
          
          if (reasoning || content) {
            res.write(`data: ${JSON.stringify({ reasoning, content })}\n\n`);
          }
        }
        res.write("data: [DONE]\n\n");
        res.end();
      } else {
        const completion = await openai.chat.completions.create({
          model: "nvidia/nvidia-nemotron-nano-9b-v2",
          messages: messages,
          temperature: 0.6,
          top_p: 0.95,
          max_tokens: 2048,
          // @ts-ignore
          extra_body: {
            min_thinking_tokens: 1024,
            max_thinking_tokens: 2048
          }
        } as any);
        res.json(completion);
      }
    } catch (error: any) {
      console.error("NVIDIA API Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
