"use client"

import MessageInput from "@/app/components/inputs/MessageInput"
import useConversation from "@/app/hooks/useConversation"
import axios from "axios"
import { CldUploadButton } from "next-cloudinary"
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2"



const Footer = () => {


    const { conversationId } = useConversation()

    const [text, setText] = useState('')

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    })


    const onSubmit: SubmitHandler<FieldValues> = data => {
        axios.post('/api/messages/send', { ...data, message: text, conversationId }).then(() => {
            setValue('message', '', { shouldValidate: true })
            setText('')
        })
    }

    const handleUpload = (result: any) => {
        axios.post('/api/messages/send', {
            image: result?.info?.secure_url,
            conversationId
        })
    }

    return (
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full ">
            <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="roz5so1m">
                <HiPhoto size={30} className="text-primary" />
            </CldUploadButton>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
                <MessageInput id="message" required placeholder="Type a message" register={register} text={text} setText={setText} />
                <button type="submit" className="rounded-full p-2 bg-primary cursor-pointer hover:bg-primary/80 transition">
                    <HiPaperAirplane size={20} className="text-white" />
                </button>
            </form>
        </div>
    )
}

export default Footer