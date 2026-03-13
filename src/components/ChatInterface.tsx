import { useMemo, useRef, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useChatRealtime } from "@/hooks/use-chat-realtime"
import { insertAiMessage, insertUserMessage } from "@/services/chat.service"
import { getAiReplyForProducts } from "@/services/ai.service"
import type { ChatMessage } from "@/types/chat"
import {
  MESSAGE_CHAT_SEND_FAILED,
  MESSAGE_COMMON_UNKNOWN_ERROR,
} from "@/constants/messages"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatInterfaceProps {
  title?: string
}

export const ChatInterface = ({ title }: ChatInterfaceProps) => {
  const { user } = useAuth()
  const [input, setInput] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isAiTyping, setIsAiTyping] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { messages, loading, errorMessage: realtimeError, appendMessage } =
    useChatRealtime(user?.id)

  const endRef = useRef<HTMLDivElement | null>(null)

  const combinedError = useMemo(
    () => errorMessage ?? realtimeError,
    [errorMessage, realtimeError],
  )

  const sortedMessages = useMemo(
    () =>
      [...messages].sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt),
      ),
    [messages],
  )

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = async () => {
    if (!user) {
      return
    }

    const trimmed = input.trim()

    if (!trimmed || isSending) {
      return
    }

    setIsSending(true)
    setIsAiTyping(true)
    setErrorMessage(null)

    try {
      const userResult = await insertUserMessage(user.id, trimmed)

      if (!userResult.data || userResult.errorMessage) {
        setErrorMessage(userResult.errorMessage ?? MESSAGE_CHAT_SEND_FAILED)
        setIsAiTyping(false)
        return
      }

      appendMessage(userResult.data)
      setInput("")
      scrollToBottom()

      const aiResult = await getAiReplyForProducts(trimmed, sortedMessages)

      if (!aiResult.data || aiResult.errorMessage) {
        setErrorMessage(
          aiResult.errorMessage ?? MESSAGE_COMMON_UNKNOWN_ERROR,
        )
        setIsAiTyping(false)
        return
      }

      const aiInsertResult = await insertAiMessage(user.id, aiResult.data)

      if (!aiInsertResult.data || aiInsertResult.errorMessage) {
        setErrorMessage(
          aiInsertResult.errorMessage ?? MESSAGE_COMMON_UNKNOWN_ERROR,
        )
        setIsAiTyping(false)
        return
      }

      appendMessage(aiInsertResult.data)
      scrollToBottom()
    } catch {
      setErrorMessage(MESSAGE_COMMON_UNKNOWN_ERROR)
    } finally {
      setIsSending(false)
      setIsAiTyping(false)
    }
  }

  if (!user) {
    return (
      <Card className="flex h-80 flex-col gap-3 p-4 text-sm text-gray-700">
        <p className="font-semibold">Please log in to start a chat.</p>
        <p>Your chat history is visible only after authentication.</p>
      </Card>
    )
  }

  return (
    <Card className="flex h-[28rem] flex-col p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {title ?? "AI Product Assistant"}
        </h2>
        {loading && (
          <span className="text-xs text-gray-500">Loading chat...</span>
        )}
      </div>

      <div className="mb-3 flex-1 overflow-y-auto rounded border bg-gray-50 p-3 text-sm">
        {sortedMessages.length === 0 && !loading && (
          <p className="text-center text-xs text-gray-500">
            Start a conversation about any product.
          </p>
        )}

        {sortedMessages.map((message) => {
          const isUser = message.senderType === "user"

          return (
            <div
              key={message.id}
              className={`mb-2 flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  isUser
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 border"
                }`}
              >
                <p className="mb-1 text-[0.7rem] font-semibold opacity-80">
                  {isUser ? "You" : "AI Assistant"}
                </p>
                <p>{message.content}</p>
              </div>
            </div>
          )
        })}

        {isAiTyping && (
          <p className="mt-2 text-xs text-gray-500">AI is typing...</p>
        )}

        <div ref={endRef} />
      </div>

      {combinedError && (
        <p className="mb-2 text-xs text-red-500">{combinedError}</p>
      )}

      <div className="flex items-center gap-2">
        <Input
          placeholder="Ask about price, availability, or features..."
          value={input}
          onChange={(event) => {
            setInput(event.target.value)
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault()
              void handleSend()
            }
          }}
        />
        <Button
          onClick={() => {
            void handleSend()
          }}
          disabled={isSending || !input.trim()}
        >
          {isSending ? "Sending..." : "Send"}
        </Button>
      </div>
    </Card>
  )
}

