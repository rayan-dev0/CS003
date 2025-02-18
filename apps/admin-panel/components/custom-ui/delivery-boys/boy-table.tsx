"use client";

import React, { useState } from 'react';
import { DeliveryBoysTableProps } from '@/lib/types';
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, SortingState, getSortedRowModel, ColumnFiltersState, getFilteredRowModel } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Download, UserSearch } from 'lucide-react';
import Papa from "papaparse";

const DeliveryBoyTable = <TData, TValue>({ data, columns }: DeliveryBoysTableProps<TData, TValue>) => {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data, 
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { sorting, columnFilters }
    });

    const downloadCSV = () => {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute("download", "delivery-boys.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <section className='mx-5'>
            <div className="flex w-full items-center justify-between py-4">
                <h2 className='font-semibold text-2xl'>
                    Delivery Boy Details
                </h2>
                <aside className='flex items-center gap-1'>
                    <div className='relative group md:w-[300px]'>
                        <UserSearch className='text-gray-500 absolute top-[6px] left-2 group-focus-within:text-black transition-colors' strokeWidth={1} />
                        <Input
                            placeholder="Search"
                            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("email")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm pl-10"
                        />
                    </div>
                    <Button variant={'outline'} onClick={downloadCSV}>
                        <Download />
                        Download CSV
                    </Button>
                </aside>
            </div>
            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        {
                            table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <TableHead key={header.id}>
                                            {
                                                header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))
                        }
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} >
                    Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>
        </section>
    );
}

export default DeliveryBoyTable;
