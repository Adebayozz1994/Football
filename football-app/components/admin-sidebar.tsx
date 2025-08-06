"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Trophy, Users, Newspaper, Settings, BarChart3, MapPin, Bell, ChevronUp, User2, UserCheck } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: BarChart3,
  },
  {
    title: "Match Management",
    icon: Trophy,
    items: [
      { title: "Matches", url: "/admin/matches" },
    ],
  },
  {
    title: "Team Management",
    icon: Users,
    items: [
      { title: "All Teams", url: "/admin/teams" },
      { title: "Create Team", url: "/admin/teams/create" },
      { title: "Team Pages", url: "/admin/teams/pages" },
    ],
  },
  {
    title: "News Management",
    icon: Newspaper,
    items: [
      { title: "All News", url: "/admin/news" },
    ],
  },
  {
    title: "State Management",
    url: "/admin/states",
    icon: MapPin,
  },
  {
    title: "User Management",
    icon: UserCheck,
    items: [
      { title: "All Users", url: "/admin/users" },
      { title: "Admin Roles", url: "/admin/users/roles" },
      { title: "Permissions", url: "/admin/users/permissions" },
    ],
  },
  {
    title: "Notifications",
    url: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  // Optional: Fetch admin profile from API
  const [admin, setAdmin] = useState<{ fullName?: string; avatar?: string; email?: string } | null>(null)

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null
        if (!token) return
        const res = await fetch("http://localhost:5000/api/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (res.ok && data.success && data.data?.admin) {
          setAdmin({
            fullName: data.data.admin.firstName + " " + data.data.admin.lastName,
            avatar: data.data.admin.avatar,
            email: data.data.admin.email,
          })
        }
      } catch (err) {
        // fallback: no profile
        setAdmin(null)
      }
    }
    fetchAdminProfile()
  }, [])

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-2">
          <Trophy className="h-8 w-8 text-primary" />
          <div>
            <h2 className="font-bold text-lg">Football Hub</h2>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start">
                        {item.items.map((subItem) => (
                          <DropdownMenuItem key={subItem.title} asChild>
                            <Link href={subItem.url}>{subItem.title}</Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url!}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={admin?.avatar || "/placeholder-user.jpg"} alt={admin?.fullName || "Admin"} />
                    <AvatarFallback className="bg-gray-800 text-yellow-400 font-bold">
                      {admin?.fullName ? admin.fullName.charAt(0).toUpperCase() : <User2 className="h-5 w-5" />}
                    </AvatarFallback>
                  </Avatar>
                  <span>{admin?.fullName || "Admin"}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile">
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings">
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}