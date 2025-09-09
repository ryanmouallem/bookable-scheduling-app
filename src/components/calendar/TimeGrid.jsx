"use client"

import React, { useState } from 'react'

export default function TimeGrid({title, barbers}) {
    const [hoveredSlot, setHoveredSlot] = useState(null)

    // Helper function to convert 24-hour to 12-hour format
    const formatTime12Hour = (hour) => {
        if (hour === 0) return '12:00 AM'
        if (hour < 12) return `${hour}:00 AM`
        if (hour === 12) return '12:00 PM'
        return `${hour - 12}:00 PM`
    }

    // Helper function to format time for specific slot
    const formatSlotTime = (hour, minute) => {
        const hourStr = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
        const ampm = hour >= 12 ? 'PM' : 'AM'
        return `${hourStr}:${minute.toString().padStart(2, '0')} ${ampm}`
    }

    // Generate hours from 9 AM to 5 PM
    const hours = []
    for (let hour = 9; hour < 19; hour++) {
        hours.push(hour)
    }

    // Generate all 15-minute time slots for hover/click handling
    const timeSlots = []
    for (let hour = 9; hour < 17; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            timeSlots.push({ hour, minute })
        }
    }

    return (
        <div className="p-4 h-full flex flex-col">
            <h1 className="mb-4">{title}</h1>

            {/* Fixed header */}
            <div 
                className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `70px repeat(${barbers.length}, 1fr)`,
                    gap: '0px',
                    boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.10)'
                }}
            >
                {/* empty corner cell */}
                <div className="bg-white"></div>

                {/* barber headers */}
                {barbers.map((barber, index) => {
                    // Generate avatar color based on barber name for consistency
                    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-indigo-500']
                    const avatarColor = colors[index % colors.length]
                    const initials = `${barber.firstName[0]}${barber.lastName[0]}`
                    
                    return (
                        <div key={barber.id} className="py-4 px-2 text-center bg-white flex flex-col items-center space-y-2">
                            {/* Circular avatar */}
                            <div className={`w-12 h-12 ${avatarColor} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                                {initials}
                            </div>
                            
                            {/* Barber name */}
                            <div className="font-medium text-sm text-gray-800">
                                {barber.firstName} {barber.lastName}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Scrollable calendar grid */}
            <div 
                className="flex-1 overflow-y-auto border-l border-r border-gray-200" 
                style={{ 
                    maxHeight: 'calc(100vh - 200px)',
                    marginTop: '-1px' // Creates the "tucked under" effect
                }}
            >
                <div 
                    className="bg-gray-100"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `70px repeat(${barbers.length}, 1fr)`,
                        gap: '1px'
                    }}
                >
                    {/* time rows - one row per hour, then 4 quarter-hour sub-rows */}
                    {hours.map(hour => (
                        <React.Fragment key={hour}>
                            {/* Hour label spanning 4 quarter-hour rows */}
                            <div 
                                className="bg-gray-50 text-xs font-medium text-gray-600 text-right pr-2 pt-3 whitespace-nowrap"
                                style={{ 
                                    gridRow: 'span 4',
                                    minHeight: '120px',
                                    borderRight: '1px solid #e5e7eb'
                                }}
                            >
                                {formatTime12Hour(hour)}
                            </div>

                            {/* 4 quarter-hour rows for this hour */}
                            {[0, 15, 30, 45].map(minute => (
                                <React.Fragment key={`${hour}-${minute}`}>
                                    {/* time slots for each barber */}
                                    {barbers.map(barber => {
                                        const slotKey = `${hour}-${minute}-${barber.id}`
                                        const isHovered = hoveredSlot === slotKey
                                        
                                        return (
                                            <div 
                                                key={slotKey} 
                                                className="bg-white hover:bg-blue-50 cursor-pointer transition-all duration-150 relative flex items-center"
                                                style={{ 
                                                    height: '30px',
                                                    borderBottom: minute === 45 ? '1px solid #d1d5db' : '1px solid #f9fafb',
                                                    borderRight: '1px solid #f9fafb'
                                                }}
                                                onMouseEnter={() => setHoveredSlot(slotKey)}
                                                onMouseLeave={() => setHoveredSlot(null)}
                                            >
                                                {isHovered && (
                                                    <span className="text-xs text-gray-600 font-medium pl-2">
                                                        {formatSlotTime(hour, minute)}
                                                    </span>
                                                )}
                                                {/* empty slot - will contain appointments later */}
                                            </div>
                                        )
                                    })}
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}