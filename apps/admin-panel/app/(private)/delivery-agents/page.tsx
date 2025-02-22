import React from 'react';
import { DeliveryAgentType } from '@/lib/types';
import axios from 'axios';
import AddDeliveryAgentDialog from '@/components/custom-ui/delivery-agents/add-agent-dialog';
import DeliveryAgentTable from '@/components/custom-ui/delivery-agents/agent-table';
import { columns } from '@/components/custom-ui/delivery-agents/columns';

const fetchDeliveryAgents = async (): Promise<DeliveryAgentType[]> => {
  try {
      const response = await axios.get<{ success: boolean, agents: DeliveryAgentType[] }>(`${process.env.NEXT_PUBLIC_BACKEND_URI}/delivery/get-all-agents`, {
          headers: {
            "adminKey": `Bearer-${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}`
          }
      });
      return response.data.agents;
  } catch (error) {
      console.error("Error fetching data" + error);
      return [];
  }
}

const DeliveryAgents = async () => {
  const deliveryAgents: DeliveryAgentType[] = await fetchDeliveryAgents();
  
  return (
    <main className='w-full'>
      <section className='flex justify-end py-4 px-5'>
        <AddDeliveryAgentDialog />
      </section>
      {/* @ts-ignore */}
      <DeliveryAgentTable data={deliveryAgents} columns={columns} />
    </main>
  )
}

export default DeliveryAgents;