import getConversationById from '@/app/actions/getConversationById'
import getMedia from '@/app/actions/getMedia'
import getMessages from '@/app/actions/getMessages'
import EmptyState from '@/app/components/EmptyState'
import clsx from 'clsx'
import Body from './components/Body'
import Footer from './components/Footer'
import Header from './components/Header'

interface Iparams {
    conversationId: string
}

const page = async ({ params }: { params: Iparams }) => {

    const conversation = await getConversationById(params.conversationId)

    const messages = await getMessages(params.conversationId)

    const images = await getMedia(params.conversationId)

    if (!conversation) {
        return (
            <div className={clsx("h-full lg:pl-[350px]")}>
                <EmptyState />
            </div>
        )
    }

    return (
        <div className="lg:pl-[350px] h-full">
            <div className="h-full flex flex-col">
                <Header conversation={conversation} images={images} />
                <Body initialMessages={messages} />
                <Footer />
            </div>
        </div>
    )
}

export default page