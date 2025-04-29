import React from 'react';
import axios from 'axios';
import { columns } from '@/components/custom-ui/delivery-agents/columns';
import { AgentsTable } from '@/components/custom-ui/delivery-agents/agents-table';
import { DeliveryAgentType } from '@/lib/types';
import { auth } from '@/auth';

const fetchDeliveryAgents = async (): Promise<DeliveryAgentType[]> => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/delivery/get-all-agents`, {
                headers: {
                    contentType: "application/json",
                    adminKey: `Bearer-${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}`
                }
            }
        );
        return response.data.agents;
    } catch (error) {
        console.error("Error fetching delivery agents:", error);
        return [];
    }
}

const DeliveryAgents = async () => {

    const session = await auth();
    const userId = session?.user?.id;

    const deliveryAgents = await fetchDeliveryAgents();
    const sellerSpecificDeliveryAgents = deliveryAgents.filter((agent) => agent.sellers.includes(userId as string));

    return (
        <main className='w-full p-6'>
            <h1 className="text-2xl font-bold mb-6">Delivery Agents</h1>
            <AgentsTable columns={columns} data={sellerSpecificDeliveryAgents} />
        </main>
    );
}

export default DeliveryAgents;
