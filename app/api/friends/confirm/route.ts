
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb'
import { pusherServer } from '@/app/libs/pusher';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {

        const currentUser = await getCurrentUser()

        const body = await request.json()


        const updateFriendRequest = await prisma.friends.update({
            data: {
                status: "ACCEPTED"
            },
            where: {
                id: body.id
            },
            include: {
                userSender: true,
                userReceiver: true
            }
        })

        await pusherServer.trigger(currentUser?.email!, 'friends:update', updateFriendRequest);


        return NextResponse.json(updateFriendRequest)


    } catch (error) {
        console.log('CONFIRM_ERROR', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}