import { AppSidebar } from "@/components/custom-ui/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar>
          {children}
        </AppSidebar>
      </SidebarProvider>
    </>
  );
}

export default RootLayout;