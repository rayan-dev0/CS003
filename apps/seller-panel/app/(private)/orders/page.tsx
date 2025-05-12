import { auth } from '@/auth';
import { columns } from '@/components/custom-ui/orders/columns';
import OrdersTable from '@/components/custom-ui/orders/orders-table';
import axios from 'axios';
import React from 'react';

const fetchOrders = async (sellerId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/order/seller-get`, {
            headers: {
                'Accept': 'application/json',
                'sellerId': sellerId
            }
        });
        return response.data.orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}

const Orders = async () => {

    const session = await auth();
    const userId = session?.user?.id;

    const orders = await fetchOrders(userId as string);

    console.log(orders);

    return (
        <main className='w-full p-6'>
            <h1 className="text-2xl font-bold mb-6">Customer Orders</h1>
            <OrdersTable columns={columns} data={orders} />
        </main>
    )
}

export default Orders;
