"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Ghost, Pen, Trash2 } from "lucide-react"

export type Seller = {
    username: string
    email: string
    businessName: string
}

export const columns: ColumnDef<Seller>[] = [
    {
        accessorKey: "username",
        header: ({ column }) => <div className="text-center text-lg">
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Username
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        </div>,
        cell: ({ row }) => {
            return <div className="text-lg  text-center py-2 "> {row.getValue("username")}</div>
        }
    },
    {
        accessorKey: "email",
        header: () => <div className="text-center text-lg">Email</div>,
        cell: ({ row }) => {
            return <div className="text-lg text-center py-2 "> {row.getValue("email")}</div>
        }
    },
    {
        accessorKey: "businessName",
        header: () => <div className="text-center text-lg">Business Name</div>,
        cell: ({ row }) => {
            return <div className="text-lg text-center py-2 "> {row.getValue("businessName")}</div>
        }
    },
    {
        accessorKey: "quickActions",
        header: () => <div className="text-center text-lg">Quick Actions</div>,
        cell: () => {
            return <div className="flex justify-center items-center ">
                <div className="border mx-1 p-1 rounded-lg cursor-pointer hover:bg-gray-200 transition-all focus:bg-gray-300">

                    <Eye className=" text-lg  " size={20} />
                </div>
                <div className="border mx-1 p-1 rounded-lg cursor-pointer hover:bg-gray-200 transition-all focus:bg-gray-300">

                    <Pen className=" text-lg   " size={20} />
                </div>
                <div className="border mx-1 p-1 rounded-lg cursor-pointer hover:bg-red-200 transition-all focus:bg-red-300">

                    <Trash2 className=" text-lg   text-red-500" size={20} />
                </div>
            </div>
        },
    },
] 