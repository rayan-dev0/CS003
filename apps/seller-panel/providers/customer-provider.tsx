"use client";

import { CustomerType, ProviderType } from '@/lib/types';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const CustomerContext = createContext({
    customers: [] as CustomerType[],
    fetchCustomers: () => {}
});

const CustomerProvider: React.FC<ProviderType> = ({ children }) => {

    const [customers, setCustomers] = useState<CustomerType[]>([]);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/customer/get-all`, {
                headers: {
                    "Accept": "application/json",
                    "adminKey": `Bearer-${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}`
                }
            });
            if(response) {
                setCustomers(response.data.customers);
            }
        } catch (error) {
            console.error('Error fetching customers', error);   
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <CustomerContext.Provider value={{ customers, fetchCustomers }}>
            {children}
        </CustomerContext.Provider>
    )
}

export default CustomerProvider;