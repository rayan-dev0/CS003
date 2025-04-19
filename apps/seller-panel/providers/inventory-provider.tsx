"use client";

import { ProductCategoryType, ProviderType } from '@/lib/types';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { createContext, useEffect, useState } from 'react';

export const InventoryContext = createContext({
    categories: [] as ProductCategoryType[],
    fetchCategories: () => {}
});

const InventoryProvider: React.FC<ProviderType> = ({ children }) => {

    const session = useSession();

    const [categories, setCategories] = useState<ProductCategoryType[]>([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/inventory/category/get`, {
                headers: {
                    "Accept": "application/json",
                    "sellerId": `${session.data?.user?.id}`
                }
            });
            if(response) {
                setCategories(response.data.categories);
            }
        } catch (error) {
            console.error('Error fetching categories', error);   
        }
    }

    useEffect(() => {
        if(session.data?.user?.id) {
            fetchCategories();
        }
    }, [session]);

    return (
        <InventoryContext.Provider value={{ categories, fetchCategories }}>
            {children}
        </InventoryContext.Provider>
    )
}

export default InventoryProvider;