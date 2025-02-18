import React from 'react';
import { DeliveryBoyType } from '@/lib/types';
import axios from 'axios';
import AddDeliveryBoyDialog from '@/components/custom-ui/delivery-boys/add-boy-dialog';
import DeliveryBoyTable from '@/components/custom-ui/delivery-boys/boy-table';
import { columns } from '@/components/custom-ui/delivery-boys/columns';

const fetchDeliveryBoys = async (): Promise<DeliveryBoyType[]> => {
  try {
      const response = await axios.get<{ success: boolean, deliveryBoys: DeliveryBoyType[] }>('http://localhost:3000/api/delivery', {
          headers: {
            "adminKey": `Bearer-O2fanmhj4m/IG5cxJHkCJpqx4mI59r5jXRqJJHOIfiE=`
          }
      });
      return response.data.deliveryBoys;
  } catch (error) {
      console.error("Error fetching data" + error);
      return [];
  }
}

const DeliveryBoys = async () => {
  const deliveryBoys: DeliveryBoyType[] = await fetchDeliveryBoys();
  
  return (
    <main className='w-full'>
      <section className='flex justify-end py-4 px-5'>
        <AddDeliveryBoyDialog />
      </section>
      {/* @ts-ignore */}
      <DeliveryBoyTable data={deliveryBoys} columns={columns} />
    </main>
  )
}

export default DeliveryBoys;