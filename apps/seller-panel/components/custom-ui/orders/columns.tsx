"use client";

import { Button } from '@/components/ui/button';
import { OrderTableColumns } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { OrderDetailsSheet } from './order-details-sheet';


export const columns: ColumnDef<OrderTableColumns>[] = [
    {
        accessorKey: "_id",
        header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Order ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
    },
    {
        accessorKey: "customerName",
        header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Customer Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
    },
    {
        accessorKey: "totalAmount",
        header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Total Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Order Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        cell: ({ row }) => {
            const status = row.getValue('status');
            let bg = 'bg-gray-200';
            let text = 'text-gray-800';
            switch (status) {
                case 'pending':
                    bg = 'bg-yellow-400'; text = 'text-yellow-900';
                    break;
                case 'confirmed':
                    bg = 'bg-blue-500'; text = 'text-white';
                    break;
                case 'preparing':
                    bg = 'bg-orange-400'; text = 'text-white';
                    break;
                case 'ready_for_pickup':
                    bg = 'bg-indigo-500'; text = 'text-white';
                    break;
                case 'out_for_delivery':
                    bg = 'bg-purple-500'; text = 'text-white';
                    break;
                case 'delivered':
                    bg = 'bg-green-500'; text = 'text-white';
                    break;
                case 'cancelled':
                    bg = 'bg-red-500'; text = 'text-white';
                    break;
                default:
                    bg = 'bg-gray-200'; text = 'text-gray-800';
            }
            return <Badge className={`${bg} ${text}`}>{String(status).replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Badge>;
        }
    },
    {
        id: "quickActions",
        header: "Quick Actions",
        cell: ({ row }) => {
            const order = row.original;
            return (
                <article className='flex items-center gap-1'>
                    <OrderDetailsSheet order={order} />
                </article>
            );
        }
    }
]