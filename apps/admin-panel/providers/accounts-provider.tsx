"use client";

import { DeliveryAgentType, ProviderType, SellerType } from '@/lib/types';
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AccountsContext = createContext({
    agents: [] as DeliveryAgentType[],
    sellers: [] as SellerType[]
});

const AccountsProvider: React.FC<ProviderType> = ({ children }) => {

    const [agents, setAgents] = useState<DeliveryAgentType[]>([]);
    const [sellers, setSellers] = useState<SellerType[]>([]);

    const fetchDeliveryAgents = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/delivery/get-all-agents`, {
                headers: {
                    "Accept": "application/json",
                    "adminKey": `Bearer-${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}`
                }
            });
            setAgents(response.data.agents);
        } catch (error) {
            console.error("Error fetching delivery agents", error);
        }
    }

    const fetchSellers = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/seller/get-all-sellers`, {
                headers: {
                    "Accept": "application/json",
                    "adminKey": `Bearer-${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}`
                }
            });
            setSellers(response.data.sellers);
        } catch (error) {
            console.error("Error fetching sellers", error);
        }
    }

    useEffect(() => {
        fetchSellers();
        fetchDeliveryAgents();
    }, []);

    return (
        <AccountsContext.Provider value={{ agents, sellers }}>
            {children}
        </AccountsContext.Provider>
    )
}

export default AccountsProvider;
