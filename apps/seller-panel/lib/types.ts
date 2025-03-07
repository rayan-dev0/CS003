import { LucideIcon } from "lucide-react";

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