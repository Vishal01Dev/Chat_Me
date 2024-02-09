
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {

        const body = await request.json()

        const updateFriendRequest = await prisma.friends.update({
            data: {
                status: "ACCEPTED"
            },
            where: {
                id: body.id
            }
        })

        const deleteFriendRequest = await prisma.friends.delete({
            where: {
                id: body.id
            }
        })

        return NextResponse.json(deleteFriendRequest)


    } catch (error) {
        console.log('CANCEL_ERROR', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}