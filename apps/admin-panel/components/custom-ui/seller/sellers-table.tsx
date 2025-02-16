import React from 'react';
import axios from 'axios';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import NewSellerDialog from './NewSellerDialog';
import { SessionProvider } from 'next-auth/react';
import { toast } from '@/hooks/use-toast';

type SellerType = {
    id: string,
    username: string,
    email: string,
    phoneNumber: string,
    businessName: string,
    businessAddress: string,
    businessType: string
};

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

const SellersTable = async () => {
    const sellers: SellerType[] = await fetchSellers();

    return (
        <div>
            <div className='m-5 flex justify-end'>

                <SessionProvider>
                    <NewSellerDialog />
                </SessionProvider>
            </div>
            <div className="rounded-md border w-[90rem] m-10">
                <DataTable
                    data={sellers.map((seller) => ({
                        id: seller.id,
                        username: seller.username,
                        email: seller.email,
                        businessName: seller.businessName
                    }))}
                    columns={columns}
                />
            </div>
        </div>
    );
}

export default SellersTable;
