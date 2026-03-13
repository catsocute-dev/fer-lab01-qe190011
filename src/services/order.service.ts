import { supabase } from "@/lib/supabaseClient"
import { SUPABASE_ORDERS_TABLE } from "@/constants/supabase"
import {
  MESSAGE_ORDER_CREATE_FAILED,
  MESSAGE_COMMON_UNKNOWN_ERROR,
} from "@/constants/messages"
import type { CreateOrderPayload, Order } from "@/types/order"
import type { ServiceResult } from "@/types/service"

export const createOrder = async (
  payload: CreateOrderPayload,
): Promise<ServiceResult<Order>> => {
  const { userId, totalPrice, items, status = "PENDING" } = payload

  try {
    const { data, error } = await supabase
      .from(SUPABASE_ORDERS_TABLE)
      .insert({
        user_id: userId,
        total_price: totalPrice,
        items,
        status,
      })
      .select()
      .single()

    if (error) {
      return {
        data: null,
        errorMessage: MESSAGE_ORDER_CREATE_FAILED,
      }
    }

    if (!data) {
      return {
        data: null,
        errorMessage: MESSAGE_COMMON_UNKNOWN_ERROR,
      }
    }

    const mapped: Order = {
      id: data.id,
      userId: data.user_id,
      totalPrice: data.total_price,
      items: data.items ?? [],
      status: data.status,
      createdAt: data.created_at,
    }

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

export const getOrdersByUser = async (
  userId: string,
): Promise<ServiceResult<Order[]>> => {
  try {
    const { data, error } = await supabase
      .from(SUPABASE_ORDERS_TABLE)
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      return {
        data: null,
        errorMessage: MESSAGE_COMMON_UNKNOWN_ERROR,
      }
    }

    if (!data) {
      return {
        data: [],
        errorMessage: null,
      }
    }

    const mapped: Order[] = data.map((row) => ({
      id: row.id,
      userId: row.user_id,
      totalPrice: row.total_price,
      items: row.items ?? [],
      status: row.status,
      createdAt: row.created_at,
    }))

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

