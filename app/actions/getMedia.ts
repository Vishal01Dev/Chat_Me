import prisma from '@/app/libs/prismadb'

const getMedia = async (conversationId: string) => {

    try {

        const messagesWithImages = await prisma.message.findMany({
            where: {
                conversationId: conversationId,
                image: {
                    not: null
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        });


        return messagesWithImages

    } catch (error) {
        return []
    }
}


export default getMedia