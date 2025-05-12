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

export interface ProductCategoryType {
    _id: string,
    name: string
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
    name: string,
    category: string,
    price: number,
    status: "In Stock" | "Out of Stock",
    stock_quantity: number,
    images: string[],
    description: string,
    admin_category: string
}

export interface TableProps<TData, TValue> {
    data: TData[],
    columns: ColumnDef<TData, TValue>[]
}

export interface EditProductModalProps {
    productData: any
}

export interface DeliveryAgentType {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    sellers: string[];
}

export interface OrderTableColumns {
    _id: string,
    customerId: string,
    customerName?: string,
    phoneNumber?: string,
    totalAmount: number,
    status: string,
    paymentStatus: string,
    timestamp: string,
    items: any,
    deliveryAddress: string,
    paymentMethod: "cash" | "online"
}

export interface CustomerType {
    _id: string,
    fullName: string,
    phoneNumber: number,
    email?: string
}