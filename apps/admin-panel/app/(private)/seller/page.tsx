import React from 'react';
import { auth } from '@/auth';
import AddSellerDialog from '@/components/custom-ui/seller/add-seller-dialog';
import SellersTable from '@/components/custom-ui/seller/sellers-table';
import { SellerType } from '@/lib/types';
import axios from 'axios';
import { columns } from '@/components/custom-ui/seller/columns';

const fetchSellers = async (): Promise<SellerType[]> => {
  try {
      const response = await axios.get<{ success: boolean, sellers: SellerType[] }>('http://localhost:3000/api/seller', {
          headers: {
              "adminKey": `Bearer-O2fanmhj4m/IG5cxJHkCJpqx4mI59r5jXRqJJHOIfiE=`
          }
      });
      return response.data.sellers;
  } catch (error) {
      console.error("Error fetching data" + error);
      return [];
  }
}

const Seller = async () => {
  const sellers: SellerType[] = await fetchSellers();
  const session = await auth();

  return (
    <main className='w-full'>
      <section className='flex justify-end py-4 px-8'>
        <AddSellerDialog adminKey={session?.user?.id as string} />
      </section>
      <SellersTable data={sellers} columns={columns} />
    </main>
  )
}

export default Seller;