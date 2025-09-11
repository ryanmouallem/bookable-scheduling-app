"use client";

import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./ui/app-sidebar";
import StaffManagement from "./staff/StaffManagement";
import { X } from "lucide-react";

export function AppWrapper({ children }) {
    const [isStaffDrawerOpen, setIsStaffDrawerOpen] = useState(false);
    const toggleStaffDrawer = () => setIsStaffDrawerOpen(!isStaffDrawerOpen);

    return (
        <SidebarProvider>
            <AppSidebar onSettingsClick={toggleStaffDrawer} />
            
            {/* Conditional Staff Panel */}
            {isStaffDrawerOpen && (
                <div className="w-96 bg-white flex flex-col mt-1">
                    {/* Panel Header */}
                    <div className="flex items-center justify-end p-1 border-b">
                        <button 
                            onClick={toggleStaffDrawer}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    
                    {/* Panel Content */}
                    <div className="flex-1 overflow-y-auto border-r border-gray-200">
                        <StaffManagement />
                    </div>
                </div>
            )}
            
            <main className="flex-1">
                <SidebarTrigger className="ml-3 mt-2 scale-125"/>
                {children}
            </main>
        </SidebarProvider>
    );
}