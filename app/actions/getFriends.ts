import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'


const getFriends = async () => {
    try {

        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return null
        }

        const friends = await prisma.friends.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                OR: [
                    {
                        userSenderId: currentUser.id,

                    },
                    {
                        userReceiverId: currentUser.id,
                    }
                ],
                status: "ACCEPTED"
            },
            include: {
                userSender: true,
                userReceiver: true
            }
        })

        return friends

    } catch (error) {
        return null
    }
}

export default getFriends