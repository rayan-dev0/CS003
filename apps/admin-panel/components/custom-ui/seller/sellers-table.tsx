import React from 'react';
import axios from 'axios';

type SellerType = {
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
            <h2>Sellers List</h2>
            <ul>
                {sellers.length > 0 ? (
                    sellers.map((seller, index) => (
                        <li key={index}>
                            {seller.username} - {seller.businessName}
                        </li>
                    ))
                ) : (
                    <p>No sellers found.</p>
                )}
            </ul>
        </div>
    )
}

export default SellersTable;
