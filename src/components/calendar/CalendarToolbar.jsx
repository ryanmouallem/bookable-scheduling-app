"use client"; 
import React from "react";

import { Button } from "@/components/ui/button";

export default function CalendarToolbar() {
    return(
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <div className="flex items-center space-x-4">
                TODO: Today + Data navigation
            </div>
            <div className="flex items-center space-x-4">
                TODO: Dropdowns
            </div>
            <div className="flex items-center space-x-2">
                TODO: Action Buttons
            </div>
        </div>
    )
}