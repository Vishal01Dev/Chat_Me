"use client"

import useConversation from "@/app/hooks/useConversation"
import { pusherClient } from "@/app/libs/pusher"
import { FriendsWithUsers, FullConversationType } from "@/app/types"
import { Friends } from "@prisma/client"
import clsx from "clsx"
import { find, keyBy } from "lodash"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { TbMessageCirclePlus } from "react-icons/tb"
import ConversationBox from "./ConversationBox"
import NewConversationModel from "./NewConversationModel"
import useOtherUser from "@/app/hooks/useOtherUser"

interface ConversationsListProps {
    conversations: FullConversationType[]
    friends: FriendsWithUsers[]
}

const ConversationsList: React.FC<ConversationsListProps> = ({ conversations, friends }) => {

    const [items, setItems] = useState(conversations)

    const [isModelOpen, setIsModelOpen] = useState(false)

    const session = useSession()

    const { conversationId, isOpen } = useConversation()

    const router = useRouter()


    const pusherKey = useMemo(() => {
        return session?.data?.user?.email
    }, [session?.data?.user?.email])

    useEffect(() => {
        if (!pusherKey) {
            return
        }

        pusherClient.subscribe(pusherKey)

        const newHandler = (conversation: FullConversationType) => {
            setItems(current => {
                if (find(current, { id: conversation.id })) {
                    return current
                }

                return [conversation, ...current]
            })
        }

        const updateHandler = (conversation: FullConversationType) => {
            setItems(current => current.map(item => {
                if (item.id === conversation.id) {
                    return {
                        ...item,
                        messages: conversation.messages
                    }
                }
                return item
            }))
        }

        const removeHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                return [...current.filter((convo) => convo.id !== conversation.id)]
            })

            if (conversationId === conversation.id) {
                router.push('/conversations')
            }
        }

        pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:remove', removeHandler)

        return () => {
            pusherClient.unsubscribe(pusherKey)
            pusherClient.unbind('conversation:new', newHandler)
            pusherClient.unbind('conversation:update', updateHandler)
            pusherClient.unbind('conversation:remove', removeHandler)
        }

    }, [pusherKey, conversationId, router])


    const handleSearch = (e: any) => {
        const searchInput = e.target.value


        const SearchedConvo = conversations.filter((convo) => {

            let otherUser;

            const currentUserEmail = session?.data?.user?.email;

            const ou = convo?.users.filter((user) => user.email !== currentUserEmail);

            otherUser = ou[0];

            return otherUser?.name?.toLowerCase().includes(searchInput.toLowerCase())

        })

        setItems(SearchedConvo)

    }


    return (
        <>
            <NewConversationModel isOpen={isModelOpen} onClose={() => setIsModelOpen(false)} friends={friends} />

            <aside className={clsx(`fixed inset-y-0 pb-18 lg:pb-0 lg:left-20 lg:w-[350px] lg:block overflow-y-auto border-r bg-white border-gray-200`, isOpen ? `hidden` : 'block w-full left-0')}>
                <div className="relative h-full shadow bg-white lg:rounded-2xl overflow-y-auto p-5">
                    <div className="absolute top-5 right-5">
                        <div title="New Conversation" onClick={() => setIsModelOpen(true)} className="rounded-md py-2 px-4 flex gap-x-1 items-center bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
                            <TbMessageCirclePlus size={18} />
                            <span className="text-xs font-semibold">New</span>
                        </div>
                    </div>
                    <div className="flex-col">
                        <div className="text-xl font-bold text-primary">
                            Messages
                        </div>
                    </div>
                    <div className="relative mt-10">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <FaSearch size={18} className="text-primary" />
                        </div>
                        <input type="search" id="search" autoComplete="search" placeholder="Search by name" onChange={handleSearch}
                            className="form-input w-full block rounded-md border-0 bg-gray-100 border-primary font-medium outline-none focus:outline-none focus:ring-0 py-2 pl-11 text-primary placeholder:text-primary/70 placeholder:text-sm text-sm"
                        />
                    </div>
                    <div className="py-6">

                        {
                            items?.map((convo) => (
                                <ConversationBox key={convo.id} convo={convo} selected={conversationId === convo.id} />
                            ))
                        }
                    </div>
                </div>
            </aside>
        </>
    )
}

export default ConversationsList