"use client";

import { Button } from '@/components/ui/button';
import { ProductsTableColumns } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ScanEye } from "lucide-react";
import Link from 'next/link';

export const columns: ColumnDef<ProductsTableColumns>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Product Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
    },
    {
        accessorKey: "category",
        header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Pricing
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
    },
    {
        accessorKey: "stock_quantity",
        header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Stock Quantity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
    },
    {
        id: "quickActions",
        header: "Quick Actions",
        cell: ({ row }) => {
            const product = row.original;

            return (
                <article className='flex items-center gap-1'>
                    <Link href={`/inventory/products/${product._id}`}>
                        <Button size={'icon'} variant={'ghost'}>
                            <ScanEye />
                        </Button>
                    </Link>
                    {/* <UpdateDeliveryAgentDialog deliveryAgentData={deliveryAgent} />
                    <DeleteDialog deliveryAgentId={deliveryAgent._id} /> */}
                </article>
            )
        }
    }
]