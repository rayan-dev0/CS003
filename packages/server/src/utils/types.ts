import { Request } from "express";

export interface AuthRequest extends Request {
    user?: string
}

export interface ItemType {
    productId: string,
    quantity: number,
    price: number,
    name: string
}

export interface OrderType {
    orderData: {
        customerId: string,
        sellerId: string, 
        agentId?: string,
        items: ItemType[],
        totalAmount: number,
        status: 'pending' | 'confirmed' | 'preparing' | 'ready_for_pickup' | 'out_for_delivery' | 'delivered' | 'cancelled',
        paymentStatus: 'pending' | 'completed' | 'failed',
        paymentMethod: 'cash' | 'online',
        deliveryAddress: string
    }
}