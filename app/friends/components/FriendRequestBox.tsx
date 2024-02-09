"use client"
import Avatar from '@/app/components/avatar/Avatar';
import Button from '@/app/components/buttons/Button';
import { FriendsWithUsers } from '@/app/types';
import { Friends } from '@prisma/client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface FriendRequestBoxProps {
    friend: FriendsWithUsers
}

const FriendRequestBox: React.FC<FriendRequestBoxProps> = ({ friend }) => {

    const session = useSession()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const userSender = friend.userSender


    const HandleConfirm = async (type: string) => {
        setIsLoading(true)

        if (type === 'confirm') {
            await axios.post('/api/friends/confirm', {
                id: friend.id
            })
                .then(() => {
                    toast.success('Friend request accpeted!')
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('Something went wrong!')
                })
                .finally(() => setIsLoading(false))
        }
        if (type === 'reject') {
            await axios.post('/api/friends/cancel', {
                id: friend.id
            })
                .then(() => {
                    toast.success('Friend request rejected!')
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('Something went wrong!')
                })
                .finally(() => setIsLoading(false))
        }
    }

    return (
        <div className='flex justify-between items-center'>
            <div className='flex gap-x-5 '>
                <Avatar user={userSender} />
                <h2 className='font-semibold'>{userSender.name}</h2>
            </div>
            <div className='flex gap-x-2'>
                <Button onClick={() => HandleConfirm('reject')} danger>Cancel</Button>
                <Button onClick={() => HandleConfirm('confirm')}>Confirm</Button>
            </div>
        </div>
    )
}

export default FriendRequestBox