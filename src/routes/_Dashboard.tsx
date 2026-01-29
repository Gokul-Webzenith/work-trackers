import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { Home, Briefcase, BarChart } from 'lucide-react'

export const Route = createFileRoute('/_Dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <SidebarProvider>
      <div
        style={{
          display: 'flex',
          width: '100vw',
          minHeight: '100vh',
        }}
      >
  
        <div
          style={{
            width: '200px',         
            minWidth: '200px',
            maxWidth: '200px',
            borderRight: '1px solid #e5e7eb',
            background: '#fff',
          }}
        >
          <SidebarContent
            style={{
              width: '100%',
              padding: '8px',
            }}
          >
            <SidebarGroup>
              <SidebarGroupLabel style={{ fontSize: '12px' }}>
                Menu
              </SidebarGroupLabel>

              <SidebarMenu>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/">
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/work">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Work
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/dash">
                      <BarChart className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </div>

     
        <div
          style={{
            flex: 1,            
            minWidth: 0,
            margin: 0,
            padding: 0,
            overflow: 'auto',
            background: '#f9fafb',
          }}
        >
          <Outlet />
        </div>

      </div>
    </SidebarProvider>
  )
}
