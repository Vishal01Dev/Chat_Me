"use client"

import { useEffect, useMemo, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { RiUserReceived2Line } from "react-icons/ri"
import { TiUserAddOutline } from "react-icons/ti"
import AddFriendModel from "./AddFriendModel"
import FriendBox from "./FriendBox"
import FriendRequestsModel from "./FriendRequestsModel"
import { useSession } from "next-auth/react"
import { FriendsWithUsers, FullFriendsType } from "@/app/types"
import { pusherClient } from "@/app/libs/pusher"
import { find } from "lodash"


interface FriendsListProps {
    friends: FriendsWithUsers[]
    friendRequests: FriendsWithUsers[]
}



const FriendsList: React.FC<FriendsListProps> = ({ friends, friendRequests }) => {

    const session = useSession()


    const [isModelOpen, setIsModelOpen] = useState<boolean>(false)

    const [reqModel, setReqModel] = useState<boolean>(false)

    const [frnds, setfrnds] = useState(friends)

    console.log(friends)

    const pusherKey = useMemo(() => {
        return session?.data?.user?.email
    }, [session?.data?.user?.email])

    useEffect(() => {
        if (!pusherKey) {
            return
        }

        pusherClient.subscribe(pusherKey)

        const updateHandler = (f: FriendsWithUsers) => {
            setfrnds((current) => {
                if (find(current, { id: f.id })) {
                    return current;
                }

                return [...current, f]
            });
        }

        pusherClient.bind('friends:update', updateHandler)

        return () => {
            pusherClient.unbind('friends:update', updateHandler)
            pusherClient.unsubscribe(pusherKey)
        }

    }, [])

    const handleSearch = (e: any) => {
        const searchInput = e.target.value

        const SearchedFriends = frnds?.filter((frnd) => {
            let otherUser;

            if (frnd.userSender.email === session?.data?.user?.email) {
                otherUser = frnd.userReceiver
            } else {

                otherUser = frnd.userSender
            }

            return otherUser?.name?.toLowerCase().includes(searchInput.toLowerCase())

        })


        setfrnds(SearchedFriends)

    }

    return (
        <>
            <FriendRequestsModel isOpen={reqModel} onClose={() => setReqModel(false)} friendRequests={friendRequests} />
            <AddFriendModel isOpen={isModelOpen} onClose={() => setIsModelOpen(false)} />

            <aside className="fixed inset-y-0 pb-18 lg:pb-0 lg:left-20 lg:w-[350px] lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
                <div className="relative h-full shadow bg-white p-5 overflow-y-auto">
                    <div className="absolute top-5 right-5 flex gap-x-2">
                        <div title="Friend Requests" onClick={() => setReqModel(true)} className="relative rounded-md p-2 flex gap-x-1 items-center bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
                            <RiUserReceived2Line size={18} />
                            {
                                friendRequests?.length > 0 &&
                                <span className="w-3 h-3 animate-pulse bg-red-600 rounded-full -top-1 -right-1 absolute"></span>
                            }
                        </div>
                        <div title="Add friend" onClick={() => setIsModelOpen(true)} className="rounded-md py-2 px-4 flex gap-x-1 items-center bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
                            <TiUserAddOutline size={18} />
                            <span className="text-xs font-semibold">Add</span>

                        </div>
                    </div>
                    <div className="flex-col">
                        <div className="text-xl font-bold text-primary">
                            Friends
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
                    <div className="my-5">

                        {
                            frnds?.length > 0 ?
                                frnds?.map((friend) => {

                                    return (
                                        <FriendBox key={friend.id} friend={friend} onClose={() => { }} />
                                    )
                                }
                                )
                                :

                                <p className="text-center font-semibold text-gray-700 py-10">No friends</p>
                        }
                    </div>
                </div>
            </aside>
        </>
    )
}

export default FriendsList