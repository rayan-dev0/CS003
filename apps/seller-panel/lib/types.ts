import { LucideIcon } from "lucide-react";

export interface NavItemsType {
    items: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
}
export interface AdminType {
  user: {
    name: string
    email: string
    avatar: string
  }
}