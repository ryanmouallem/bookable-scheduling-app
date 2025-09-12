"use client";

import { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const TIME_COLUMN_WIDTH = '70px';

export default function CalendarToolbar({ 
  users = [], 
  staffFilter, 
  setStaffFilter, 
  selectedTeamMembers, 
  setSelectedTeamMembers,
  staffFilterDisplayText
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [staffFilterOpen, setStaffFilterOpen] = useState(false);

  const handleTeamMemberToggle = (userId) => {
    const newSelected = new Set(selectedTeamMembers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedTeamMembers(newSelected);
    
    // When individual members are selected, change filter to show that
    if (newSelected.size > 0) {
      setStaffFilter("Team members");
    }
  };

  return (
    <div>
      <div>
        
        {/* Toolbar content */}
        <div className="flex items-center justify-between py-2 px-4 bg-gray-50/50 border-b">
          {/* Left section: Today + Date navigation + Staff filter */}
          <div className="flex items-center gap-x-3">
            <div className="inline-flex border border-emerald-200 bg-white rounded-full overflow-hidden">
              <Button
                variant="ghost"
                className="font-medium text-gray-700 hover:bg-emerald-50 px-4 h-8"
                onClick={() => setSelectedDate(new Date())}
              >
                Today
              </Button>
            </div>

            <div className="inline-flex border border-emerald-200 bg-white rounded-full overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-emerald-50"
                onClick={() => setSelectedDate(subDays(selectedDate, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="font-medium text-gray-700 hover:bg-emerald-50 px-4 h-8"
                  >
                    {format(selectedDate, "EEEE dd MMM")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setDatePickerOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-emerald-50"
                onClick={() => setSelectedDate(addDays(selectedDate, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Popover open={staffFilterOpen} onOpenChange={setStaffFilterOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:bg-emerald-50 border border-emerald-200 bg-white rounded-full px-4 h-8"
                >
                  {staffFilterDisplayText}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0" align="start">
                <div className="p-2">
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm h-8"
                      onClick={() => {
                        setStaffFilter("Scheduled team");
                        setSelectedTeamMembers(new Set()); // Clear individual selections
                        setStaffFilterOpen(false);
                      }}
                    >
                      Scheduled team
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm h-8"
                      onClick={() => {
                        setStaffFilter("All staff");
                        setSelectedTeamMembers(new Set()); // Clear individual selections
                        setStaffFilterOpen(false);
                      }}
                    >
                      All staff
                    </Button>
                    <div className="border-t my-2"></div>
                    <div className="text-xs font-medium text-gray-500 px-2 py-1">Team members</div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {users.map((user) => (
                        <div key={user.id} className="flex items-center space-x-2 px-2 py-1">
                          <Checkbox
                            id={`user-${user.id}`}
                            checked={selectedTeamMembers.has(user.id)}
                            onCheckedChange={() => handleTeamMemberToggle(user.id)}
                            className="h-4 w-4"
                          />
                          <label
                            htmlFor={`user-${user.id}`}
                            className="text-sm cursor-pointer flex-1"
                          >
                            {user.firstName} {user.lastName}
                            <span className="text-xs text-gray-500 ml-1">({user.role})</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Center section: Empty for now */}
          <div></div>

          {/* Right section: Actions */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center">
                <div className="inline-flex border border-emerald-200 bg-white rounded-full overflow-hidden">
                  <Button
                    variant="ghost"
                    className="font-medium text-gray-700 hover:bg-emerald-50 px-4 h-8"
                  >
                    Add
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0" align="end">
              <div className="p-2">
                <button className="w-full cursor-pointer text-left px-2 py-1 h-8 text-sm hover:bg-gray-100 rounded">
                  Appointment
                </button>
                <button className="w-full cursor-pointer text-left px-2 py-1 h-8 text-sm hover:bg-gray-100 rounded">
                  Sales
                </button>
              </div>
            </PopoverContent>
          </Popover>

        </div>
      </div>
    </div>
  );
}