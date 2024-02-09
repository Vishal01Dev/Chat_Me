import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';

export async function POST(req: Request) {
    try {

        const currentUser = await getCurrentUser()

        const body = await req.json();

        const { email } = body

        if (!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!email) {
            return new NextResponse('Invalid details', { status: 400 })
        }

        const friendDetails = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        const alreadyFriends = await prisma.friends.count({
            where: {
                userSenderId: currentUser.id,
                userReceiverId: friendDetails?.id,
                status: "ACCEPTED"
            }
        })

        if (alreadyFriends === 1) {
            return new NextResponse('This user is already your friend', { status: 400 })
        }

        const friends = await prisma.friends.create({
            data: {
                userSenderId: currentUser.id as string,
                userReceiverId: friendDetails?.id as string,
                status: "PENDING",
                userId: currentUser.id
            },
            include: {
                userSender: true,
                userReceiver: true,
            }
        })

        return NextResponse.json(friends)


    } catch (error) {
        console.log(error)
        return new NextResponse('ADD FRIEND ERROR', { status: 500 })

    }
}