import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import {
  SUPABASE_MESSAGES_TABLE,
  SUPABASE_SCHEMA,
} from "@/constants/supabase"
import { MESSAGE_CHAT_REALTIMESUB_FAILED } from "@/constants/messages"
import type { ChatMessage } from "@/types/chat"

interface UseChatRealtimeResult {
  messages: ChatMessage[]
  loading: boolean
  errorMessage: string | null
  appendMessage: (message: ChatMessage) => void
}

export const useChatRealtime = (
  userId: string | null | undefined,
): UseChatRealtimeResult => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const appendMessage = (message: ChatMessage) => {
    setMessages((prev) => {
      if (prev.some((m) => m.id === message.id)) {
        return prev
      }

      return [...prev, message]
    })
  }

  useEffect(() => {
    if (!userId) {
      setMessages([])
      return
    }

    let isMounted = true

    const loadHistory = async () => {
      setLoading(true)
      setErrorMessage(null)

      try {
        const { data, error } = await supabase
          .from(SUPABASE_MESSAGES_TABLE)
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: true })

        if (!isMounted) {
          return
        }

        if (error) {
          setErrorMessage(MESSAGE_CHAT_REALTIMESUB_FAILED)
          setMessages([])
          return
        }

        const mapped: ChatMessage[] =
          data?.map((row) => ({
            id: row.id,
            userId: row.user_id,
            content: row.content,
            senderType: row.sender_type,
            createdAt: row.created_at,
          })) ?? []

        setMessages(mapped)
      } catch {
        if (!isMounted) {
          return
        }

        setErrorMessage(MESSAGE_CHAT_REALTIMESUB_FAILED)
        setMessages([])
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadHistory()

    return () => {
      isMounted = false
    }
  }, [userId])

  useEffect(() => {
    if (!userId) {
      return
    }

    const channel = supabase
      .channel(`chat-messages-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: SUPABASE_SCHEMA,
          table: SUPABASE_MESSAGES_TABLE,
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const row: any = payload.new

          const message: ChatMessage = {
            id: row.id,
            userId: row.user_id,
            content: row.content,
            senderType: row.sender_type,
            createdAt: row.created_at,
          }

          appendMessage(message)
        },
      )

    void channel.subscribe((status) => {
      if (status === "CHANNEL_ERROR") {
        setErrorMessage(MESSAGE_CHAT_REALTIMESUB_FAILED)
      }
    })

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [userId])

  return {
    messages,
    loading,
    errorMessage,
    appendMessage,
  }
}

