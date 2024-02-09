"use client"

import Model from "@/app/components/model/Model"
import FriendBox from "@/app/friends/components/FriendBox"
import { FriendsWithUsers } from "@/app/types"
import { Friends } from "@prisma/client"
import { useState } from "react"

interface NewConversationModelProps {
    isOpen: boolean
    onClose: () => void
    friends: FriendsWithUsers[]
}

const NewConversationModel: React.FC<NewConversationModelProps> = ({ isOpen, onClose, friends }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)


    return (
        <Model isOpen={isOpen} onClose={onClose}>

            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        New Conversation
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Select the friend with whom you wanna start new conversation</p>
                    <div className="my-10">
                        {
                            friends?.length > 0 ?
                                friends.map((friend) => {


                                    return (
                                        <FriendBox key={friend.id} friend={friend} onClose={onClose} />
                                    )
                                }
                                )
                                :

                                <p className="text-center font-semibold text-gray-700 py-10">No friends</p>
                        }
                    </div>
                </div>
            </div>

        </Model>
    )
}

export default NewConversationModel