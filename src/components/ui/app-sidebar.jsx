import React from 'react'
import { Home, Settings, Tag, TrendingUp, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Tag",
    url: "#",
    icon: Tag,
  },
  {
    title: "Users",
    url: "#",
    icon: Users,
  },
  {
    title: "Trending",
    url: "#",
    icon: TrendingUp,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                <SidebarMenuItem key={item.title} className="h-20">
                    <SidebarMenuButton asChild size='lg' className="justify-center">
                    <a href={item.url}>
                        <item.icon />
                    </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}