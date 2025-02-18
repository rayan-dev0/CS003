"use client";

import { useParams } from 'next/navigation';
import React from 'react';

const DynamicSeller = () => {

    const params = useParams();
    const sellerId = params.sellerId;

    return (
        <div>
            This is seller page {sellerId}
        </div>
    )
}

export default DynamicSeller;
