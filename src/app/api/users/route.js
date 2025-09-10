import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            where: {
                isActive:true
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
                pin: true
            },
            orderBy: [
                { role: 'asc'},
                { firstName: 'asc' }
            ]
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            {error: 'Failed to fetch users' },
            {status: 500}
        );
    }
}

export async function POST(request) {
    try {
        const { firstName, lastName, role, pin} = await request.json();

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                role,
                pin,
                isActive: true
            }
        });
        return NextResponse.json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}