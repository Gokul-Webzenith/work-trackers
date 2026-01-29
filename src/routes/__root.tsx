import { Outlet, createRootRoute, Link } from '@tanstack/react-router'
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Home, Briefcase, LayoutDashboard } from "lucide-react"

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-background">

    
        <Sidebar variant="sidebar">
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="px-3 py-4 text-lg font-bold">
              MyApp
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <Home className="size-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/todo">
                    <Briefcase className="size-4" />
                    <span>Work</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to ="/dashboard">
                    <LayoutDashboard className="size-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

       
        <SidebarInset className="flex flex-col">

          <div className="h-14 bg-black text-white flex items-center px-4">
            <span className="font-semibold tracking-wide">
              Dashboard Panel
            </span>
          </div>

          <div className="flex-1 p-4 overflow-auto">
            <Outlet />
          </div>

        </SidebarInset>

      </div>
    </SidebarProvider>
  )
}
