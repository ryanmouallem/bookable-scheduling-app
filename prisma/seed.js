const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function main() {
    // //admin
    // const admin = await prisma.user.create({
    //     data: {
    //         firstName: "Admin",
    //         lastName: "User",
    //         pin: "1234",
    //         role: "ADMIN"
    //     }
    // })

    // //Barber
    // const barber = await prisma.user.create({
    //     data: {
    //         firstName: "Ryan",
    //         lastName: "Mouallem",
    //         pin: "1998",
    //         role: "BARBER"
    //     }
    // })

    const barber2 = await prisma.user.create({
        data: {
            firstName: "Kevin",
            lastName: "Supa",
            pin: "4321",
            role: "BARBER"
        }
    })

    const barber3 = await prisma.user.create({
        data: {
            firstName: "Jaxyn",
            lastName: "Peterson",
            pin: "0000",
            role: "BARBER"
        }
    })

    //service
    // await prisma.service.createMany({
    //     data: [
    //         { name: "Haircut", duration: 30, priceCents: 3000 },
    //         { name: "Beard Trim", duration: 15, priceCents: 1500 },
    //         { name: "Haircut + Beard", duration: 45, priceCents: 4000 }
    //     ]
    // })

    console.log('Added barber2 and barber3')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())