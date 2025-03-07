import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom-ui/sidebar/app-sidebar";
import { SessionProvider } from "next-auth/react";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </SessionProvider>
  );
}

export default RootLayout;