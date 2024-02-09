"use client"

import Button from "@/app/components/buttons/Button"
import Input from "@/app/components/inputs/Input"
import Model from "@/app/components/model/Model"
import axios from "axios"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { MdAlternateEmail } from "react-icons/md"

interface AddFriendModelProps {
    isOpen: boolean
    onClose: () => void
}

const AddFriendModel: React.FC<AddFriendModelProps> = ({ isOpen, onClose }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)

        await axios.post('/api/friends/add', data)
            .then(() => {
                toast.success('Friend request sent successfully!')
            }).catch((error) => {
                toast.error(error?.response?.data)
            })
            .finally(() => {
                setIsLoading(false)
                setValue('email', '')
            });
    }

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Search Friend
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Search friend by email</p>

                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input placeholder="Enter email" icon={MdAlternateEmail} register={register} id="email" type="email" errors={errors} disabled={isLoading} />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button onClick={onClose} type="button" secondary disabled={isLoading}>Cancel</Button>
                    <Button type="submit" disabled={isLoading}>Add</Button>
                </div>
            </form>
        </Model>
    )
}

export default AddFriendModel