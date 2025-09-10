"use client";

import { useState, useMemo } from "react";
import CalendarToolbar from "./CalendarToolbar";
import TimeGrid from "./TimeGrid";

export default function CalendarView({ allUsers }) {
  const [staffFilter, setStaffFilter] = useState("Scheduled team");
  const [selectedTeamMembers, setSelectedTeamMembers] = useState(() => {
    // Initialize with all barber IDs when starting with "Scheduled team"
    return new Set(allUsers.filter(user => user.role === 'BARBER').map(user => user.id));
  });

  // Filter barbers based on current selection
  const filteredBarbers = useMemo(() => {
    const barbers = allUsers.filter(user => user.role === 'BARBER');
    
    if (staffFilter === "All staff") {
      return barbers;
    } else if (staffFilter === "Scheduled team") {
      // For now, return all barbers. Later this could filter by who has appointments today
      return barbers;
    } else if (staffFilter === "Team members") {
      // Individual team member selection - show only selected barbers
      return barbers.filter(barber => selectedTeamMembers.has(barber.id));
    } else {
      return barbers;
    }
  }, [allUsers, staffFilter, selectedTeamMembers]);

  // Dynamic display text for the staff filter button
  const getStaffFilterDisplayText = () => {
    if (staffFilter === "Team members" && selectedTeamMembers.size > 0) {
      const selectedUsers = allUsers.filter(user => selectedTeamMembers.has(user.id));
      if (selectedUsers.length === 1) {
        return selectedUsers[0].firstName;
      } else if (selectedUsers.length <= 3) {
        return selectedUsers.map(user => user.firstName).join(", ");
      } else {
        return `${selectedUsers.length} selected`;
      }
    }
    return staffFilter;
  };

  return (
    <div>
      <CalendarToolbar 
        users={allUsers}
        staffFilter={staffFilter}
        setStaffFilter={setStaffFilter}
        selectedTeamMembers={selectedTeamMembers}
        setSelectedTeamMembers={setSelectedTeamMembers}
        staffFilterDisplayText={getStaffFilterDisplayText()}
      />
      <TimeGrid barbers={filteredBarbers} />
    </div>
  );
}