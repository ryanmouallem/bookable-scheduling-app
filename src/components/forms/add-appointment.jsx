import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { format } from "date-fns";
import { Calendar } from "../ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"

//  TODO: Add form fields and functionality to save the appointment. 
export const AddAppointment = () => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [staff, setStaff] = useState([]);
  const [service, setService] = useState("");

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json();
      setStaff(data)
    } catch (error) {
      console.error('Error fetching staff:', error)
    }
  }

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <Dialog>
      <form>
        <DialogTrigger className="w-full cursor-pointer text-left px-2 py-1 h-8 text-sm hover:bg-gray-100 rounded">
          Appointment
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="my-3">Add Appointment</DialogTitle>

            {/* Date Picker */}
            <Label htmlFor="date">Select Date</Label>
            <Dialog id="date" open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost"
                  className="text-lg text-black bg-accent hover:bg-emerald-50 px-4 py-7 h-8 mb-4"
                >
                  {format(selectedDate, "EEEE dd MMM")}
                </Button>
              </DialogTrigger>
              <DialogContent className="w-auto p-3">
                <DialogTitle className="text-center">Select Date</DialogTitle>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setDatePickerOpen(false);
                  }}
                  initialFocus
                />
              </DialogContent>
            </Dialog>

            {/* Name */}
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" />
              </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Select Service */}
                <div className="grid gap-3">
                  <Label htmlFor="service">Select Service</Label>
                  <Button id="service" variant="ghost" className="w-full text-center bg-accent hover:bg-emerald-50">Services</Button>
                </div>
              {/* Select Staff Member */}
                <div className="grid gap-3">
                  <Label htmlFor="staff">Select Staff</Label>
                  <Button id="staff" variant="ghost" className="w-full text-center bg-accent hover:bg-emerald-50">Staff</Button>
                </div>
              </div>
            </div>
            <DialogFooter className={"mt-6"}>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  )
}