export type SenderType = "user" | "ai"

export interface ChatMessage {
  id: string
  userId: string
  content: string
  senderType: SenderType
  createdAt: string
}

