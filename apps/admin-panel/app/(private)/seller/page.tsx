import React from 'react';
import AddSellerDialog from '@/components/custom-ui/seller/add-seller-dialog';
import SellersTable from '@/components/custom-ui/seller/sellers-table';
import { SellerType } from '@/lib/types';
import axios from 'axios';
import { columns } from '@/components/custom-ui/seller/columns';

const fetchSellers = async (): Promise<SellerType[]> => {
  try {
    const response = await axios.get<{ success: boolean, sellers: SellerType[] }>(`${process.env.NEXT_PUBLIC_BACKEND_URI}api/seller`, {
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

  return (
    <main className='w-full'>
      <section className='flex justify-end py-4 px-5'>
        <AddSellerDialog />
      </section>
      {/* @ts-ignore */}
      <SellersTable data={sellers} columns={columns} />
    </main>
  )
}

export default Seller;