"use client"

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { FaUserFriends } from "react-icons/fa";
import { HiChat, HiOutlinePhone } from "react-icons/hi";
import useConversation from "./useConversation";

const useRoutes = () => {

    const pathname = usePathname()
    const { conversationId } = useConversation()

    const routes = useMemo(() => [
        {
            label: 'Friends',
            href: "/friends",
            icon: FaUserFriends,
            active: pathname === '/friends'
        },
        {
            label: 'Conversations',
            href: "/conversations",
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId
        },
        // {
        //     label: 'Calls',
        //     href: "/calls",
        //     icon: HiOutlinePhone,
        //     active: pathname === '/calls'
        // }
    ], [pathname, conversationId])

    return routes


}

export default useRoutes