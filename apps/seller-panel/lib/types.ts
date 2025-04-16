import { ColumnDef } from "@tanstack/react-table";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface SellerDataType {
    id: string,
    username: string,
    password: string,
    email: string,
    businessName: string,
    businessType: string,
    phoneNumber: string
}

export interface NavItemsType {
    items: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
}

export interface SellerUserType {
    username: string,
    email: string,
}

export interface ProviderType {
    children: ReactNode
}

export interface ProductCardProps {
    cardData: {
        _id: string,
        name: string,
        price: number,
        images: string[],
        category: string,
        status: "In Stock" | "Out of Stock",
        stock_quantity: number
    }
}

export interface ProductsTableColumns {
    _id: string,
    productName: string,
    productCategory: string,
    productPricing: number,
    stockStatus: "In Stock" | "Out of Stock",
    stockQuantity: number
}

export interface ProductsTableProps<TData, TValue> {
    data: TData[],
    columns: ColumnDef<TData, TValue>[]
}