import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom-ui/sidebar/app-sidebar";
import { SessionProvider } from "next-auth/react";
import InventoryProvider from "@/providers/inventory-provider";
import CustomerProvider from "@/providers/customer-provider";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <InventoryProvider>
          <CustomerProvider>
            {children}
          </CustomerProvider>
        </InventoryProvider>
      </SidebarProvider>
    </SessionProvider>
  );
}

export default RootLayout;