"use client"

import Avatar from "@/app/components/avatar/Avatar"
import useOtherUser from "@/app/hooks/useOtherUser"
import { FullConversationType } from "@/app/types"
import clsx from "clsx"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"


interface ConversationBoxProps {
    convo: FullConversationType
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ convo, selected }) => {

    const otherUser = useOtherUser(convo)

    const session = useSession()

    const router = useRouter()

    const userEmail = useMemo(() => {
        return session?.data?.user?.email
    }, [session?.data?.user?.email])



    let lastMessage = useMemo(() => {
        const messages = convo.messages || []

        return messages[messages.length - 1]

    }, [convo.messages])




    const isOwn = userEmail === lastMessage?.sender?.email


    // console.log(lastMessage)

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            if (isOwn) {
                return "You: sent an image"
            }
            else {
                return 'sent an image'
            }
        }

        if (lastMessage?.body) {
            if (isOwn) {

                return "You: " + lastMessage?.body
            }
            else {
                return lastMessage?.body
            }
        }

        return 'Started a conversation'

    }, [lastMessage, isOwn])





    const hasSeen = useMemo(() => {

        if (!lastMessage) {
            return false
        }

        const seenArray = lastMessage?.seen || []

        if (!userEmail) {
            return false
        }

        return seenArray.filter((user) => user.email === userEmail).length !== 0

    }, [userEmail, lastMessage])



    const handleClick = useCallback(() => {
        router.push(`/conversations/${convo.id}`)
    }, [convo.id, router])


    return (
        <div className={clsx(`w-full relative flex p-3 items-center space-x-3 my-1 hover:!bg-opacity-75 rounded-lg transition cursor-pointer !bg-gray-100`, selected ? `!bg-white shadow border` : `bg-gray-100`)} onClick={handleClick}>

            <Avatar user={otherUser} />


            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-base font-medium text-gray-900">{convo.name || otherUser.name}</p>
                        {
                            lastMessage?.createdAt && (
                                <p className="text-xs text-gray-800">{format(new Date(lastMessage.createdAt), 'p')}</p>
                            )
                        }
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-x-1">
                            <p className={clsx(`truncate text-sm`, hasSeen && lastMessage ? `text-gray-500` : `text-black font-medium`)}>
                                {lastMessageText}
                            </p>
                        </div>
                        <div>{
                            !hasSeen && lastMessage &&
                            <span className="block rounded-full bg-green-500 ring-2 ring-white w-2 h-2 md:h-3 md:w-3" />
                        }

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ConversationBox