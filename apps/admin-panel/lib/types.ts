import { ColumnDef } from "@tanstack/react-table";
import { LucideIcon } from "lucide-react";

export interface AdminType {
    user: {
      name: string
      email: string
      avatar: string
    }
}

export interface NavItemsType {
    items: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
}

export interface AddSellerFormProps {
    closeRef: React.RefObject<HTMLButtonElement | null>;
}

export interface UpdateSellerFormProps {
    closeRef: React.RefObject<HTMLButtonElement | null>;
    sellerData: SellerType
}

export interface SellerType {
    _id: string,
    username: string,
    password: string,
    email: string,
    phoneNumber?: string,
    businessName: string,
    businessAddress: string,
    businessType: string
};

export interface SellerTableColumns {
    id: string,
    _id: string,
    username: string,
    password: string,
    email: string,
    businessName: string,
    businessType: string,
    businessAddress: string,
    phoneNumber?: string
}

export interface SellerTableProps<TData, TValue> {
    data: TData[],
    columns: ColumnDef<TData, TValue>[]
}

