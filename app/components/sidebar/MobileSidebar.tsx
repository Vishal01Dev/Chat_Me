"use client"

import useConversation from "@/app/hooks/useConversation"
import useRoutes from "@/app/hooks/useRoutes"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import { useState } from "react"
import { HiArrowLeftOnRectangle } from "react-icons/hi2"
import { IoIosSettings } from "react-icons/io"
import Avatar from "../avatar/Avatar"
import MobileItems from "./MobileItems"
import SettingModel from "./SettingModel"

interface MobileSidebarProps {
    currentUser: User
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ currentUser }) => {

    const routes = useRoutes()

    const { isOpen } = useConversation()

    const [drawer, setDrawer] = useState(false)

    const [isModelOpen, setIsModelOpen] = useState<boolean>(false)

    if (isOpen) {
        return null
    }

    return (
        <>
            <SettingModel currentUser={currentUser} isOpen={isModelOpen} onClose={() => setIsModelOpen(false)} />
            {
                drawer && <div className="lg:hidden absolute bottom-[73px] w-1/2 bg-white right-0 shadow py-2 px-4 z-[100]">
                    <div onClick={() => { setIsModelOpen(true); setDrawer(false) }} className="flex justify-center items-center gap-x-2 bg-gray-100 text-gray-700 cursor-pointer px-3 py-1.5 rounded my-1 font-medium text-sm">
                        <IoIosSettings size={18} />
                        <p>Setting</p>
                    </div>
                    <div onClick={() => signOut()} className="flex justify-center items-center gap-x-2 bg-gray-100 text-gray-700 cursor-pointer px-3 py-1.5 rounded my-1 font-medium text-sm">
                        <HiArrowLeftOnRectangle size={18} />
                        <p>Logout</p>
                    </div>
                </div>
            }

            <div className="fixed flex justify-around w-full  bottom-0 z-50 m-0 items-center bg-white py-3 px-6 gap-x-5 border-t-[1px] lg:hidden">
                {
                    routes.map((item) => (
                        <MobileItems href={item.href} key={item.label} active={item.active} icon={item.icon} label={item.label} />
                    ))
                }
                <div className="w-full" onClick={() => setDrawer(!drawer)}>
                    <div className="cursor-pointer hover:opacity-75 transition w-fit mx-auto block">
                        <Avatar user={currentUser} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileSidebar