"use client";

import React, { useState, useCallback, useMemo, useContext } from 'react';
import { OrderTableColumns, TableProps } from '@/lib/types';
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, SortingState, getSortedRowModel, ColumnFiltersState, getFilteredRowModel } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Download, UserSearch } from 'lucide-react';
import Papa from "papaparse";
import { CustomerContext } from '@/providers/customer-provider';

const OrdersTable = ({ data, columns }: TableProps<OrderTableColumns, any>) => {

    const { customers } = useContext(CustomerContext);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const orders = useMemo(() => {
        return data.map(order => {
            const customer = customers?.find(cus => cus._id === order.customerId);
            return {
                ...order,
                customerName: customer?.fullName,
                phoneNumber: customer?.phoneNumber
            };
        });
    }, [data, customers]);

    const table = useReactTable({
        data: orders,
        //@ts-ignore
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { sorting, columnFilters },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    const downloadCSV = useCallback(() => {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute("download", "products.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); 
    }, [data]);

    const handleSearch = useCallback((value: string) => {
        table.getColumn("customerName")?.setFilterValue(value);
    }, [table]);

    return (
        <section className='md:mx-5'>
            <div className="flex w-full items-center justify-between py-4">
                <h2 className='font-semibold text-2xl hidden md:block'>
                    Order Details
                </h2>
                <aside className='flex items-center gap-1'>
                    <div className='relative group md:w-[300px]'>
                        <UserSearch className='text-gray-500 absolute top-[6px] left-2 group-focus-within:text-black transition-colors' strokeWidth={1} />
                        <Input
                            placeholder="Search orders..."
                            value={(table.getColumn("customerName")?.getFilterValue() as string) ?? ""}
                            onChange={(event) => handleSearch(event.target.value)}
                            className="max-w-sm pl-10"
                        />
                    </div>
                    <Button variant={'outline'} onClick={downloadCSV}>
                        <Download className="mr-2 h-4 w-4" />
                        Download CSV
                    </Button>
                </aside>
            </div>
            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className='text-center'>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default OrdersTable;
