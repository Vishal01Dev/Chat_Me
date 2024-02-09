"use client"

import Avatar from '@/app/components/avatar/Avatar';
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns/format";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { RiCheckDoubleLine } from "react-icons/ri";
import ImageModel from "./ImageModel";

interface MessageBoxProps {
    isLast?: boolean;
    data: FullMessageType
}

const MessageBox: React.FC<MessageBoxProps> = ({ isLast, data }) => {


    const session = useSession()
    const [imageModelOpen, setImageModelOpen] = useState(false)

    const isOwn = session?.data?.user?.email === data?.sender?.email

    const seenList = (data.seen || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)


    const container = clsx("flex gap-3 p-4 relative", isOwn && "justify-end")

    const avatar = clsx(isOwn && 'order-2')

    const body = clsx("flex flex-col gap-2 w-fit max-sm:max-w-[80%] max-w-[60%]", isOwn && "items-end")

    const message = clsx("text-sm overflow-hidden w-fit", isOwn ? "bg-primary text-white" : "bg-gray-100", data.image ? 'bg-transparent  border rounded-md p-0' : 'rounded-md py-2 px-3')

    return (
        <div className={container}>
            <div className={`${avatar} max-sm:hidden`}>
                <Avatar user={data.sender} />
            </div>

            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-xs text-gray-500">
                        {data.sender.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>
                <div className={message}>
                    <ImageModel src={data.image} isOpen={imageModelOpen} onClose={() => setImageModelOpen(false)} />
                    {data.image ? (
                        <Image onClick={() => setImageModelOpen(true)} src={data.image} alt="image" height={288} width={288} className="object-cover  cursor-pointer hover:scale-110 transition translate" />
                    ) : (
                        <div>
                            {data.body}
                        </div>
                    )}
                </div>
                {isOwn && (
                    <div className="absolute max-sm:bottom-0 max-sm:right-4 right-10 bottom-4">
                        <RiCheckDoubleLine size={18} className={clsx(`text-gray-400`, seenList.length > 0 && `text-secondary `, isOwn ? 'block' : 'hidden')} />
                    </div>
                )}
            </div>

        </div>
    )
}

export default MessageBox