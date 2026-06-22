import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { OpenAI } from "openai";

dotenv.config();

function loadGroqKey() {
  const envKey = process.env.GROQ_API_KEY || "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";
  if (envKey) {
    return envKey;
  }

  const candidatePaths = [
    path.join(process.cwd(), "groqkey.txt"),
  ];

  for (const filePath of candidatePaths) {
    try {
      if (fs.existsSync(filePath)) {
        const fileKey = fs.readFileSync(filePath, "utf-8").trim();
        if (fileKey) {
          return fileKey;
        }
      }
    } catch {
      // Ignore file fallback errors and continue.
    }
  }

  return "";
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/chat/groq", async (req, res) => {
    const { messages = [] } = req.body ?? {};
    const apiKey = loadGroqKey();

    if (!apiKey) {
      return res.status(500).json({ error: "GROQ_API_KEY is not configured" });
    }

    const formattedMessages = Array.isArray(messages) ? messages : [];

    try {
      const openai = new OpenAI({
        apiKey,
        baseURL: "https://api.groq.com/openai/v1",
      });

      const response = await openai.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: formattedMessages,
        temperature: 0.6,
      });

      const text = response.choices[0]?.message?.content || "";

      res.json({
        content: text,
      });
    } catch (error: any) {
      console.error("Groq API Error:", error);
      res.status(500).json({ error: error?.message || "Groq API Error" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (_req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
