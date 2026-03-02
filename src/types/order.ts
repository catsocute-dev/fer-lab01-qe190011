export interface OrderItem {
  name: string
  price: number
  quantity: number
}

export type OrderStatus = "PENDING" | "PAID" | "CANCELLED"

export interface Order {
  id: string
  userId: string
  totalPrice: number
  items: OrderItem[]
  status: OrderStatus
  createdAt: string
}

export interface CreateOrderPayload {
  userId: string
  totalPrice: number
  items: OrderItem[]
  status?: OrderStatus
}

