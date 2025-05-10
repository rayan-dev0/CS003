import OrderModel from "../schemas/order.schema";
import { OrderType } from "../utils/types";

export const newOrder = async (orderData: OrderType) => {
    try {
        await OrderModel.create(orderData);
        return {
            success: true,
            message: "Order created successfully"
        }
    } catch (error) {
        return { success: false, error: `Internal server error: ${error}` };
    }
}

export const allOrdersForSeller = async (sellerId: string) => {
    try {
        const orders = await OrderModel.find({ sellerId });
        return {
            success: true,
            orders
        }
    } catch (error) {
        return { success: false, error: `Internal server error: ${error}` };
    }
}

export const allOrdersForCustomer = async (customerId: string) => {
    try {
        const orders = await OrderModel.find({ customerId });
        return {
            success: true,
            orders
        }
    } catch (error) {
        return { success: false, error: `Internal server error: ${error}` };
    }
}

export const updateOrderData = async (orderId: string, orderData: OrderType) => {
    try {
        const order = await OrderModel.findById(orderId);
        if(!order) return { success: false, message: "Order does not exist" };

        await OrderModel.findByIdAndUpdate(orderId, { $set: orderData }, { new: true });
        return {
            success: true,
            message: "Order updated successfully"
        } 
    } catch (error) {
        return { success: false, error: `Internal server error: ${error}` };
    }
}

export const removeOrder = async (orderId: string) => {
    try {
        const order = await OrderModel.findById(orderId);
        if(!order) return { success: false, message: "Order does not exist" };

        await OrderModel.findByIdAndDelete(orderId);
        return {
            success: true,
            message: "Order deleted successfully"
        } 
    } catch (error) {
        return { success: false, error: `Internal server error: ${error}` };
    }
}