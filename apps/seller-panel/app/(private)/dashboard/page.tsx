"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, ShoppingBag, Truck, DollarSign } from 'lucide-react';
import { useSession } from 'next-auth/react';

// MOCK DATA (replace with real API data)
const stats = [
  { label: 'Orders Received', value: 128, icon: <ShoppingBag className="text-blue-500" /> },
  { label: 'Total Earned', value: '₹ 1,23,400', icon: <DollarSign className="text-green-500" /> },
  { label: 'Total Customers', value: 56, icon: <Users className="text-purple-500" /> },
  { label: 'Delivered Products', value: 102, icon: <Truck className="text-orange-500" /> },
];

const ordersByDay = [
  { day: 'Mon', orders: 20 },
  { day: 'Tue', orders: 35 },
  { day: 'Wed', orders: 28 },
  { day: 'Thu', orders: 40 },
  { day: 'Fri', orders: 32 },
  { day: 'Sat', orders: 50 },
  { day: 'Sun', orders: 22 },
];

const deliveryGuyStats = [
  { name: 'Arun', value: 40 },
  { name: 'Priya', value: 32 },
  { name: 'Rahul', value: 18 },
  { name: 'Sita', value: 12 },
];
const COLORS = ['#34d399', '#60a5fa', '#fbbf24', '#f87171'];

const Dashboard = () => {
    const session = useSession();
    const userName = session?.data?.user?.name;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Navigation Bar */}
            <nav className="w-full bg-white shadow flex items-center justify-between px-4 md:px-8 py-4 mb-4 sticky top-0 z-10">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800">Dashboard</h1>
                <div className="flex items-center gap-2 sm:gap-4">
                    <span className="text-xs sm:text-sm text-gray-500 truncate sm:max-w-xs">Welcome, {userName}</span>
                    {/* Add avatar, notifications, etc. here */}
                </div>
            </nav>
            <main className="flex-1 w-full mx-auto px-2 sm:px-4 md:px-8">
                {/* Top Stats Cards */}
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                    {stats.map((stat, idx) => (
                        <Card key={stat.label} className="flex items-center gap-3 md:gap-4 p-4 md:p-6 shadow-md bg-white min-h-[90px] md:min-h-[110px] w-full">
                            <div className="rounded-full bg-gray-100 p-2 md:p-3 text-xl md:text-2xl">
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-lg md:text-2xl font-bold">{stat.value}</div>
                                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Orders by Day Chart */}
                    <Card className="p-4 md:p-6 shadow-md bg-white flex flex-col min-h-[320px] h-full">
                        <div className="font-semibold mb-4 text-base md:text-lg">Orders (Day Wise)</div>
                        <div className="flex-1 min-h-[200px] h-full">
                            <ResponsiveContainer width="100%" height="100%" minHeight={200} maxHeight={360}>
                                <BarChart data={ordersByDay} barSize={32} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                                    <XAxis dataKey="day" stroke="#888" fontSize={12} />
                                    <YAxis allowDecimals={false} fontSize={12} />
                                    <Tooltip />
                                    <Bar dataKey="orders" fill="#6366f1" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                    {/* Top Delivery Agents Chart */}
                    <Card className="p-4 md:p-6 shadow-md bg-white flex flex-col min-h-[320px] h-full">
                        <div className="font-semibold mb-4 text-base md:text-lg">Top Delivery Agents</div>
                        <div className="flex-1 min-h-[200px] h-full">
                            <ResponsiveContainer width="100%" height="100%" minHeight={200} maxHeight={360}>
                                <PieChart>
                                    <Pie
                                        data={deliveryGuyStats}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {deliveryGuyStats.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
                {/* TODO: Replace mock data with real API data */}
            </main>
        </div>
    );
};

export default Dashboard;
