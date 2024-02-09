"use client"

import Model from "@/app/components/model/Model"
import { Friends } from "@prisma/client"
import { useState } from "react"
import FriendRequestList from "./FriendRequestList"
import { FriendsWithUsers } from "@/app/types"


interface AddFriendModelProps {
    isOpen: boolean
    onClose: () => void
    friendRequests: FriendsWithUsers[]
}

const AddFriendModel: React.FC<AddFriendModelProps> = ({ isOpen, onClose ,friendRequests}) => {



    const [isLoading, setIsLoading] = useState<boolean>(false)




    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Friend Requests
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Accept the friend Request to start conversation</p>

                    <div className="mt-10 flex flex-col gap-y-8">
                        <FriendRequestList friendRequests={friendRequests}/>
                    </div>
                </div>
            </div>

        </Model>
    )
}

export default AddFriendModel