import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader
} from "@/components/ui/sidebar"
import { Info, Settings, Star } from "lucide-react"
import { Link, useLocation } from "react-router"

// Menu items.
const items = [
  {
    title: "Arsip",
    url: "/archives",
    icon: Star,
  },
  {
    title: "Kategori Surat",
    url: "/categories",
    icon: Settings,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
]

export function AppSidebar() {
  const location = useLocation()
  const currentPath = location.pathname
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-xl font-semibold">Menu</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={currentPath === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}