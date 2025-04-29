import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom-ui/sidebar/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import AccountsProvider from "@/providers/accounts-provider";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <AccountsProvider>
        <AppSidebar />
        {children}
      </AccountsProvider>
      <Toaster />
    </SidebarProvider>
  );
}

export default RootLayout;