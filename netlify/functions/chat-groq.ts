import OpenAI from "openai";
import fs from "fs";
import path from "path";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function loadApiKey() {
  const envKey = process.env.GROQ_API_KEY || "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";
  if (envKey) {
    return envKey;
  }

  const candidatePaths = [
    path.join(process.cwd(), "groqkey.txt"),
    path.join(__dirname, "..", "..", "groqkey.txt"),
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
      // Ignore file fallback errors and continue to the next source.
    }
  }

  return "";
}

export const handler = async (event: any) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const apiKey = loadApiKey();
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Groq API key is missing. Set GROQ_API_KEY in Netlify or add groqkey.txt for local fallback." }),
    };
  }

  let payload: any = {};
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid JSON payload" }),
    };
  }

  const messages = Array.isArray(payload.messages) ? payload.messages : [];
  const stream = payload.stream === true;

  const openai = new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.6,
      stream,
    } as any);

    if (stream) {
      let fullContent = "";

      for await (const chunk of completion as any) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) fullContent += content;
      }

      return {
        statusCode: 200,
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          content: fullContent,
        }),
      };
    }

    const content = completion.choices[0]?.message?.content || "";
    return {
      statusCode: 200,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
      }),
    };
  } catch (error: any) {
    console.error("Groq API Error:", error);
    return {
      statusCode: 500,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ error: error?.message || "Groq API Error" }),
    };
  }
};
