import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router"

export function SidebarLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container">
        <SidebarTrigger className="p-5" />
        <div className="pt-6 px-10">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}