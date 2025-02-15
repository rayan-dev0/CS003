"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Search, Download, Bell, Users, LineChart, ShoppingCart } from "lucide-react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const salesData = [
  { month: "Jan", revenue: 1000 },
  { month: "Feb", revenue: 2000 },
  { month: "Mar", revenue: 3000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 1000 },
  { month: "Jul", revenue: 3200 },
  { month: "Aug", revenue: 4100 },
  { month: "Sep", revenue: 4300 },
  { month: "Oct", revenue: 3900 },
  { month: "Nov", revenue: 2700 },
  { month: "Dec", revenue: 3600 },
];

const recentSales = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "$1,999.00" },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "$39.00" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "$299.00" },
  { name: "William Kim", email: "will@email.com", amount: "$99.00" },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "$39.00" },
];

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Navbar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-800 rounded-full"></div>
          <span className="text-lg font-semibold">Alicia Koch</span>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg focus:outline-none"
          />
          <Bell className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      {/* Dashboard Header */}
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex items-center gap-4">
        <Button variant="outline" className="bg-gray-200">Overview</Button>
        <Button variant="outline">Analytics</Button>
        <Button variant="outline">Reports</Button>
        <Button variant="outline">Notifications</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-gray-500 text-sm">Total Revenue</h2>
            <p className="text-2xl font-semibold">$45,231.89</p>
            <p className="text-sm text-green-500">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-gray-500 text-sm">Subscriptions</h2>
            <p className="text-2xl font-semibold">+2350</p>
            <p className="text-sm text-green-500">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-gray-500 text-sm">Sales</h2>
            <p className="text-2xl font-semibold">+12,234</p>
            <p className="text-sm text-green-500">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-gray-500 text-sm">Active Now</h2>
            <p className="text-2xl font-semibold">+573</p>
            <p className="text-sm text-green-500">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Overview Chart & Recent Sales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Overview</h2>
            {/* <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="black" />
              </BarChart>
            </ResponsiveContainer> */}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Sales</h2>
            <p className="text-sm text-gray-500">You made 265 sales this month.</p>
            <div className="mt-4 space-y-4">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="font-semibold">{sale.name}</p>
                      <p className="text-sm text-gray-500">{sale.email}</p>
                    </div>
                  </div>
                  <p className="font-semibold">{sale.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}