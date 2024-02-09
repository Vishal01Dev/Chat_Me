"use client"


import Avatar from "@/app/components/avatar/Avatar";
import AvatarGroup from "@/app/components/avatar/AvatarGroup";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, Message, User } from "@prisma/client"
import { format } from "date-fns/format";
import { Fragment, useMemo, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import ConfirmModel from "./ConfirmModel";
import { HiPhoto } from "react-icons/hi2";
import Image from "next/image";
import getMedia from "@/app/actions/getMedia";
import useActiveList from "@/app/hooks/useActiveList";

interface ProfileDrawerProps {
    data: Conversation & {
        users: User[]
    }
    isOpen: boolean;
    onClose: () => void;
    images: Message[]
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose, data, images }) => {

    const otherUser = useOtherUser(data)

    const [showMedia, setShowMedia] = useState(false)

    const { members } = useActiveList()

    const isActive = members.indexOf(otherUser?.email!) !== -1

    const [confirmOpen, setConfirmOpen] = useState(false)

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP')
    }, [otherUser.createdAt])

    const title = useMemo(() => {
        return data.name || otherUser.name
    }, [data.name, otherUser.name])

    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`
        }

        return isActive ? 'Active' : 'Offline'

    }, [data,isActive])

    return (
        <>
            <ConfirmModel isModelOpen={confirmOpen} onClose={() => setConfirmOpen(false)} />

            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <Transition.Child as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-40 sm:bg-opacity-0" />

                    </Transition.Child>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 sm:top-[67px] !right-0 flex sm:max-w-md h-screen sm:h-fit">
                                <Transition.Child as={Fragment}
                                    enter="transform transition ease-in-out duration-500"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transform transition ease-in-out duration-500"
                                    leaveTo="opacity-0"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl border ">
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-start justify-end">
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button onClick={onClose} className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" type="button">
                                                            <span className="sr-only">Close Panel</span>
                                                            <IoClose size={24} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                <div className="flex flex-col items-center">
                                                    <div className="mb-2">
                                                        {
                                                            data.isGroup ? (
                                                                <AvatarGroup users={data.users} />
                                                            )
                                                                : (
                                                                    <Avatar user={otherUser} />
                                                                )
                                                        }
                                                    </div>
                                                    <div>
                                                        {title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {statusText}
                                                    </div>
                                                    <div className="flex gap-10 my-8">
                                                        <div onClick={() => setConfirmOpen(true)} className="flex flex-col items-center cursor-pointer gap-3 hover:opacity-75">
                                                            <div className="w-10 h-10 bg-neutral-100 rounded-full flex justify-center items-center text-primary">
                                                                <IoTrash size={20} />
                                                            </div>
                                                            <div className="text-sm font-light text-primary">Delete</div>
                                                        </div>
                                                        <div onClick={() => setShowMedia(!showMedia)} className="flex flex-col items-center cursor-pointer gap-3 hover:opacity-75">
                                                            <div className="w-10 h-10 bg-neutral-100 rounded-full flex justify-center items-center text-primary">
                                                                <HiPhoto size={20} />
                                                            </div>
                                                            <div className="text-sm font-light text-primary">Media</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full pb-5 pt-5 sm:px-6 sm:pt-0">
                                                    {
                                                        !showMedia ?
                                                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                                                                {
                                                                    data.isGroup && (
                                                                        <div>
                                                                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                                Emails
                                                                            </dt>
                                                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                                {
                                                                                    data.users.map(user => user.email).join(", ")
                                                                                }
                                                                            </dd>
                                                                        </div>
                                                                    )
                                                                }
                                                                {!data.isGroup && (
                                                                    <div>
                                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                            Email
                                                                        </dt>
                                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                            {otherUser.email}
                                                                        </dd>
                                                                    </div>
                                                                )}
                                                                {!data.isGroup && (
                                                                    <>
                                                                        <hr />
                                                                        <div>
                                                                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                                Joined
                                                                            </dt>
                                                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                                <time dateTime={joinedDate}>
                                                                                    {joinedDate}
                                                                                </time>

                                                                            </dd>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </dl>
                                                            :

                                                            (
                                                                <div className="max-h-96 overflow-auto">
                                                                    <div className="grid grid-cols-3 gap-2 ">
                                                                        {
                                                                            images?.length > 0 ?
                                                                                images.map((image) => (
                                                                                    <div key={image.id} className="col-span-1 shadow rounded-md border">
                                                                                        <Image src={image?.image || "/images/placeholder.png"} alt="media" width={90} height={90} className="mx-auto" />
                                                                                    </div>
                                                                                ))
                                                                                : (
                                                                                    <div className="col-span-3">
                                                                                        <p className="text-center font-semibold text-sm text-gray-600">No Media</p>
                                                                                    </div>
                                                                                )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>

                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default ProfileDrawer