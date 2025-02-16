import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom-ui/sidebar/app-sidebar";
import { Toaster } from "@/components/ui/toaster";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
      <Toaster />
    </SidebarProvider>
  );
}

export default RootLayout;