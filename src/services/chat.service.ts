import { supabase } from "@/lib/supabaseClient"
import { SUPABASE_MESSAGES_TABLE } from "@/constants/supabase"
import {
  MESSAGE_CHAT_LOAD_FAILED,
  MESSAGE_CHAT_SEND_FAILED,
  MESSAGE_COMMON_UNKNOWN_ERROR,
} from "@/constants/messages"
import type { ChatMessage, SenderType } from "@/types/chat"
import type { ServiceResult } from "@/types/service"

const mapRowToChatMessage = (row: any): ChatMessage => ({
  id: row.id,
  userId: row.user_id,
  content: row.content,
  senderType: row.sender_type,
  createdAt: row.created_at,
})

export const getMessagesByUser = async (
  userId: string,
): Promise<ServiceResult<ChatMessage[]>> => {
  try {
    const { data, error } = await supabase
      .from(SUPABASE_MESSAGES_TABLE)
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })

    if (error) {
      return {
        data: null,
        errorMessage: MESSAGE_CHAT_LOAD_FAILED,
      }
    }

    if (!data) {
      return {
        data: [],
        errorMessage: null,
      }
    }

    const mapped: ChatMessage[] = data.map(mapRowToChatMessage)

    return {
      data: mapped,
      errorMessage: null,
    }
  } catch {
    return {
      data: null,
      errorMessage: MESSAGE_COMMON_UNKNOWN_ERROR,
    }
  }
}

const insertMessageInternal = async (
  userId: string,
  content: string,
  senderType: SenderType,
): Promise<ServiceResult<ChatMessage>> => {
  try {
    const { data, error } = await supabase
      .from(SUPABASE_MESSAGES_TABLE)
      .insert({
        user_id: userId,
        content,
        sender_type: senderType,
      })
      .select()
      .single()

    if (error) {
      return {
        data: null,
        errorMessage: MESSAGE_CHAT_SEND_FAILED,
      }
    }

    if (!data) {
      return {
        data: null,
        errorMessage: MESSAGE_COMMON_UNKNOWN_ERROR,
      }
    }

    return {
      data: mapRowToChatMessage(data),
      errorMessage: null,
    }
  } catch {
    return {
      data: null,
      errorMessage: MESSAGE_COMMON_UNKNOWN_ERROR,
    }
  }
}

export const insertUserMessage = async (
  userId: string,
  content: string,
): Promise<ServiceResult<ChatMessage>> => insertMessageInternal(userId, content, "user")

export const insertAiMessage = async (
  userId: string,
  content: string,
): Promise<ServiceResult<ChatMessage>> => insertMessageInternal(userId, content, "ai")

