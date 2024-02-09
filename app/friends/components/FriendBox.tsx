"use client"

import Avatar from "@/app/components/avatar/Avatar";
import { FriendsWithUsers } from "@/app/types";
import { Friends, User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";


interface FriendBoxProps {
    friend: FriendsWithUsers
    onClose?: () => void
}

const FriendBox: React.FC<FriendBoxProps> = ({ friend, onClose }) => {

    const session = useSession()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    let otherUser: User;

    if (friend.userSender.email === session?.data?.user?.email) {
        otherUser = friend.userReceiver
    } else {

        otherUser = friend.userSender
    }

    const handleClick = useCallback(() => {

        setIsLoading(true)

        axios.post('/api/conversations/add', {
            userId: otherUser.id,
        })
            .then((data) => {
                router.push(`/conversations/${data.data.id}`);
            })
            .finally(() => {
                setIsLoading(false)
                onClose && onClose();
            })

    }, [otherUser, router, onClose])

    return (
        <div onClick={handleClick} className="w-full relative flex items-center my-1 space-x-4 bg-gray-100 p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer">
            <Avatar user={otherUser} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-900">{otherUser?.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendBox