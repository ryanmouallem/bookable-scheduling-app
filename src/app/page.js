import CalendarToolbar from "@/components/calendar/CalendarToolbar";
import TimeGrid from "@/components/calendar/TimeGrid";
import { prisma } from '@/lib/prisma';

export default async function Home() {

  const barbers = await prisma.user.findMany({
    where: {
      role: 'BARBER'
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      role: true
    }
  })

  return (
    <main>
      <CalendarToolbar />
      <TimeGrid barbers={barbers} />
    </main>
  )
}