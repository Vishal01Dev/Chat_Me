import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'


const getFriendRequests = async () => {
    try {

        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return null
        }

        const friendRequests = await prisma.friends.findMany({
            where: {
                userReceiverId: currentUser.id,
                status: "PENDING"
            },
            include: {
                userSender: true,
                userReceiver: true
            }
        })

        return friendRequests

    } catch (error) {
        return null
    }
}


export default getFriendRequests