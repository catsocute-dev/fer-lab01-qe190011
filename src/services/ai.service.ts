import { GEMINI_API_KEY, GEMINI_MODEL } from "@/constants/ai"
import {
  MESSAGE_CHAT_AI_RESPONSE_FAILED,
  MESSAGE_CHAT_GEMINI_CONFIG_MISSING,
  MESSAGE_COMMON_UNKNOWN_ERROR,
} from "@/constants/messages"
import type { ChatMessage } from "@/types/chat"
import type { ServiceResult } from "@/types/service"
import { products } from "@/data/products"

const buildPrompt = (userMessage: string, history: ChatMessage[]): string => {
  const lastMessages = history.slice(-10)
  const historyText = lastMessages
    .map(
      (m) =>
        `${m.senderType === "user" ? "User" : "AI"}: ${m.content}`,
    )
    .join("\n")

  const productSummary = products
    .map(
      (p) =>
        `- ${p.name} (id: ${p.id}) | price: ${p.price} VND | category: ${p.category ?? ""} | stock: ${p.stock ?? ""}`,
    )
    .join("\n")

  return [
    "You are an AI assistant for an e-commerce website.",
    "Answer questions about the products below using concise, helpful descriptions.",
    "Always answer in Vietnamese.",
    "",
    "Product catalog:",
    productSummary,
    "",
    "Chat history:",
    historyText || "(no previous messages)",
    "",
    `User: ${userMessage}`,
    "AI:",
  ].join("\n")
}

export const getAiReplyForProducts = async (
  userMessage: string,
  history: ChatMessage[],
): Promise<ServiceResult<string>> => {
  if (!GEMINI_API_KEY) {
    return {
      data: null,
      errorMessage: MESSAGE_CHAT_GEMINI_CONFIG_MISSING,
    }
  }

  const prompt = buildPrompt(userMessage, history)
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    })

    if (!response.ok) {
      return {
        data: null,
        errorMessage: MESSAGE_CHAT_AI_RESPONSE_FAILED,
      }
    }

    const data = (await response.json()) as any
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      data?.candidates?.[0]?.output_text ??
      ""

    if (!text) {
      return {
        data: null,
        errorMessage: MESSAGE_CHAT_AI_RESPONSE_FAILED,
      }
    }

    return {
      data: text,
      errorMessage: null,
    }
  } catch {
    return {
      data: null,
      errorMessage: MESSAGE_COMMON_UNKNOWN_ERROR,
    }
  }
}

