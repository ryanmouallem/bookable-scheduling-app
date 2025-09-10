import CalendarView from "@/components/calendar/CalendarView";
import { prisma } from '@/lib/prisma';

export default async function Home() {

  const allUsers = await prisma.user.findMany({
    where: {
      isActive: true
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      role: true
    },
    orderBy: [
      { role: 'asc' },
      { firstName: 'asc' }
    ]
  })

  return (
    <main>
      <CalendarView allUsers={allUsers} />
    </main>
  )
}