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
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const TIME_COLUMN_WIDTH = '70px';

export default function CalendarToolbar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="px-4 pt-4">
      <div style={{
        display: 'grid',
        gridTemplateColumns: `${TIME_COLUMN_WIDTH} 1fr`,
        gap: '0px'
      }}>
        
        <div></div>
        
        {/* Toolbar content */}
        <div className="flex items-center justify-between py-3 px-4 bg-emerald-50/50 border border-emerald-100 rounded-lg">
          {/* Left section: Today + Date navigation */}
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

              <Popover>
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
                    onSelect={setSelectedDate}
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
          </div>

          {/* Center section: Team filter */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="text-gray-700 hover:bg-emerald-50 border border-emerald-200 bg-white rounded-full"
            >
              All Staff
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Right section: Actions */}
          <div className="flex items-center">
            <div className="inline-flex border border-gray-200 bg-black rounded-full overflow-hidden">
              <Button
                variant="ghost"
                className="font-medium text-white hover:bg-gray-800 px-4 h-8"
              >
                Add
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}