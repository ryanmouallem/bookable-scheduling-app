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


export const AppSidebar = ({ onSettingsClick }) => {

  const items = [
  // {
  //   title: "Home",
  //   url: "#",
  //   icon: Home,
  // },
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
    onClick: onSettingsClick
  },
]
  return (
    <Sidebar className="w-16 md:w-20 border-r">
      <SidebarContent>
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                <SidebarMenuItem key={item.title} className="h-20">
                    <SidebarMenuButton asChild size='default' className="justify-center">
                    <button
                    onClick={item.onClick || (() => {})}>
                      <item.icon className="h-4 w-4" />
                    </button>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}