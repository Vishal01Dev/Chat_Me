"use client"

import { User } from "@prisma/client"
import axios from "axios"
import { CldUploadButton } from "next-cloudinary"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FaUser } from "react-icons/fa"
import Button from "../buttons/Button"
import Input from "../inputs/Input"
import Model from "../model/Model"

interface SettingModelProps {
    isOpen?: boolean
    onClose: () => void
    currentUser: User
}

const SettingModel: React.FC<SettingModelProps> = ({ isOpen, onClose, currentUser }) => {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image
        }
    })


    const image = watch('image')

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/settings', data).then(() => {
            router.refresh();
            onClose()
        })
            .catch(() => toast.error('Something went wrong'))
            .finally(() => setIsLoading(false));
    }

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-700">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Edit your public information</p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input icon={FaUser} placeholder="name" disabled={isLoading} id="name" errors={errors} required register={register} />
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image alt="profile avatar" src={image || currentUser?.image || '/images/placeholder.jpg'} width={48} height={48} className="rounded-full" />
                                    <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="roz5so1m">
                                        <Button disabled={isLoading} secondary type="button">Change</Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button onClick={onClose} type="button" secondary disabled={isLoading}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>Save</Button>
                    </div>
                </div>
            </form>
        </Model>
    )
}

export default SettingModel