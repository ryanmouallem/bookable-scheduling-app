"use client";

import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./ui/app-sidebar";
import StaffManagement from "./staff/StaffManagement";
import { X } from "lucide-react";

export function AppWrapper({ children }) {
    const [isStaffDrawerOpen, setIsStaffDrawerOpen] = useState(false);

    return (
        <SidebarProvider>
            <AppSidebar onSettingsClick={() => setIsStaffDrawerOpen(true)} />
            
            {/* Conditional Staff Panel */}
            {isStaffDrawerOpen && (
                <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
                    {/* Panel Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-semibold">Staff Management</h2>
                        <button 
                            onClick={() => setIsStaffDrawerOpen(false)}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    
                    {/* Panel Content */}
                    <div className="flex-1 overflow-y-auto">
                        <StaffManagement />
                    </div>
                </div>
            )}
            
            <main className="flex-1">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}