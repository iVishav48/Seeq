import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import { BredCrumbHeader } from "./_components/bredcrumbheader";
import { requireAuth } from "@/lib/auth-utils";

export default async function Layout({ children }: { children: React.ReactNode }) {
  await requireAuth();  
  return (
        <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
                <BredCrumbHeader />
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    )
}