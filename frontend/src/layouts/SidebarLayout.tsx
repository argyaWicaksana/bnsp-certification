import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export function SidebarLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogoutBtn = () => {
    logout()
    navigate('/login')
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container">
        <div className="p-5 flex justify-between">
          <SidebarTrigger />
          <Button className="cursor-pointer" onClick={handleLogoutBtn}>
            <LogOut />
            Logout
          </Button>
        </div>
        <div className="pt-6 px-10">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}