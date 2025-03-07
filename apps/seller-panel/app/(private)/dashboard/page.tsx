"use client";

import { signOut } from 'next-auth/react';
import React from 'react';

const Dashboard = () => {
    return (
        <div>
            Seller Dashboard
            <button onClick={() => signOut()}>
                Logout
            </button>
        </div>
    )
}

export default Dashboard;
