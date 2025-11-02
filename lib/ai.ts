"use server";
import { GoogleGenAI } from "@google/genai";

export interface PollinationsResponse {
  choices?: {
    message?: {
      content?: string;
    };
  }[];
}

export interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// Retry wrapper for network requests
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 3,
  backoff = 1000
): Promise<Response> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      console.warn(`Attempt ${attempt + 1} failed:`, err);
      if (attempt === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, backoff * (attempt + 1)));
    }
  }
  throw new Error("Failed after multiple retries");
}

// Analyze image using pollinations
export async function describeImage(imageBuffer: Buffer): Promise<PollinationsResponse> {
  const pollinationsPayload = {
    model: "openai",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Describe this image in cinematic detail as if it were a movie scene.
                  Come up with conversation snippets of characters in the scene as well 
                  as the overall atmosphere.`,
          },
          {
            type: "image_url",
            image_url: {
              url: "data:image/jpeg;base64," + imageBuffer.toString("base64"),
            },
          },
        ],
      },
    ],
    max_tokens: 100,
  };

  const pollinationsRes = await fetchWithRetry(
    `${process.env.POLLINATIONS_URL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.POLLINATIONS_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pollinationsPayload),
    }
  );

  return pollinationsRes.json();
}

// Generate subtitle using Gemini
export async function generateSubtitle(description: string): Promise<GeminiResponse> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate a single, highly cinematic subtitle (max 15 words) inspired by this scene description: "${description}".
            The subtitle should be emotional, intriguing, or metaphorical, and feel like it belongs on a movie poster or an official trailer.
            Come up with a character's dialogue and if it is then must start with a hyphen ("-"). Otherwise, it should be a descriptive line.
            Return ONLY the one-line subtitle or dialogue, with no extra text, explanations, or quotes.`
  });
  return response;
}