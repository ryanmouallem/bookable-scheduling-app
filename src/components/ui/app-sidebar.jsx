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
    useSidebar,
} from "@/components/ui/sidebar"


export const AppSidebar = ({ onSettingsClick }) => {
    const { isMobile, setOpenMobile } = useSidebar()
  
    const handleItemClick = (item) => {
        // This is to close the sidebar on mobile after clicking an item
        if (isMobile) {
            setOpenMobile(false)
        }

        if (item.onClick) {
            item.onClick()
        }
    }

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
        <SidebarGroup className="pt-9">
            <SidebarMenu>
                {items.map((item) => (
                <SidebarMenuItem key={item.title} className="h-20">
                    <SidebarMenuButton asChild size='md' className="justify-center">
                    <button onClick={() => handleItemClick(item)}>
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