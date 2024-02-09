"use client"

import Avatar from "@/app/components/avatar/Avatar"
import useOtherUser from "@/app/hooks/useOtherUser"
import { Conversation, Message, User } from "@prisma/client"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { HiChevronLeft } from "react-icons/hi"
import { IoEllipsisHorizontal } from "react-icons/io5";
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineVideoCamera } from "react-icons/hi";
import AvatarGroup from "@/app/components/avatar/AvatarGroup"
import ProfileDrawer from "./ProfileModel"
import useActiveList from "@/app/hooks/useActiveList"


interface HeaderProps {
    conversation: Conversation & {
        users: User[];
    }
    images: Message[]
}

const Header: React.FC<HeaderProps> = ({ conversation, images }) => {



    const { members } = useActiveList()
    const otherUser = useOtherUser(conversation)

    const isActive = members.indexOf(otherUser?.email!) !== -1

    const [drawerOpen, setDrawerOpen] = useState(false)

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }

        return isActive ? 'Active' : 'Offline'

    }, [conversation, isActive])

    return (
        <>
            <ProfileDrawer images={images} data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

            <div className="bg-white w-full border-b-[1px] flex px-4 py-3 lg:px-6 justify-between items-center">
                <div className="flex gap-3 sm:gap-5 items-center">
                    <Link href="/conversations" className="lg:hidden block text-primary hover:text-primary/90 transition cursor-pointer">
                        <HiChevronLeft size={28} />
                    </Link>
                    {
                        conversation.isGroup ? (
                            <AvatarGroup users={conversation.users} />
                        )
                            : (
                                <Avatar user={otherUser} />
                            )
                    }
                    <div className="flex flex-col">
                        <div className="text-primary font-semibold">
                            {conversation.name || otherUser.name}
                        </div>
                        <div className="text-xs font-light text-neutral-500">
                            {statusText}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-x-3 sm:gap-x-5">
                    {/* <HiOutlineVideoCamera size={32} className="text-primary cursor-pointer hover:text-primary/50 transition max-sm:!w-7 max-sm:!h-7 " />
                    <HiOutlinePhone size={28} className="text-primary cursor-pointer hover:text-primary/50 transition max-sm:!w-6 max-sm:!h-6" /> */}
                    <IoEllipsisHorizontal onClick={() => setDrawerOpen(true)} size={32} className="text-primary cursor-pointer hover:text-primary/50 transition max-sm:!w-7 max-sm:!h-7" />
                </div>
            </div>
        </>
    )
}

export default Header
