"use client"


import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";


import Button from "@/app/components/buttons/Button";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BsCupHot, BsGithub, BsGoogle } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
import { PiWechatLogoBold } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";
import SocialButton from "./SocialButton";

type VariantProps = "LOGIN" | "REGISTER" | undefined

const AuthForm = () => {

    const router = useRouter()
    const session = useSession()

    const [variant, setVariant] = useState<VariantProps>("LOGIN")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    })

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/conversations')
        }
    }, [session, router])


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            if (variant === "REGISTER") {
                await axios.post('/api/register', data)
                    .then(() => signIn('credentials', data))
                    .catch(() => {
                        toast.error("Something went wrong!")
                    })
                    .finally(() => {
                        toast.success('Registered successfully!')
                        setIsLoading(false)
                    });
            }

            if (variant === "LOGIN") {
                const callback = await signIn('credentials', {
                    ...data,
                    redirect: false,
                })

                if (callback?.ok && !callback.error) {
                    toast.success('Logged in successfully!')
                    router.push('/conversations')
                }
                else {
                    toast.error('Invalid credentials')
                }

            }

        } catch (error) {
            console.error('LOGIN_ERROR', error);
            toast.error('An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    }


    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER")
        }
        else {
            setVariant("LOGIN")
        }
    }, [variant])


    const socialLogin = (action: string) => {
        setIsLoading(true)

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.ok && !callback?.error) {
                    toast.success('Logged In successfully!')
                    router.push('/conversations')
                }

                if (callback?.error) {
                    toast.error('Invalid credentials')
                }
            })
            .finally(() => setIsLoading(false));
    }


    return (
        <div className="bg-white shadow-lg sm:rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="col-span-1 md:col-span-2 sm:rounded-t-xl md:!rounded-l-xl  md:rounded-t-none bg-primary flex justify-center items-center py-5 px-10">
                    <div className="flex flex-col items-center">
                        <PiWechatLogoBold size={70} className="text-white" />
                        <h2 className="text-white text-xl font-semibold tracking-wide">Chat Me</h2>
                        <div className="mt-8">
                            <p className="text-xl tracking-widest text-white text-center">Share your smile with your friends!</p>
                        </div>
                        <div className="my-5 flex flex-col items-center gap-4">
                            <BsCupHot size={44} className="text-white" />
                            <p className="text-xl text-white">Enjoy...!</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-3 md:py-10 p-8 md:px-16">
                    <div>
                        <h2 className="text-xl text-center font-semibold text-primary uppercase">{
                            variant === "REGISTER" ? 'Sign up free' : "Login to your account"

                        }</h2>
                        <div className="mt-10">
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                {
                                    variant === "REGISTER" &&
                                    <Input placeholder="Enter name" icon={FiUser} register={register} id="name" type="text" errors={errors} disabled={isLoading} />
                                }
                                <Input placeholder="Enter email" icon={MdAlternateEmail} register={register} id="email" type="email" errors={errors} disabled={isLoading} />
                                <Input placeholder="Enter password" icon={RiLockPasswordLine} register={register} id="password" type="password" errors={errors} disabled={isLoading} />
                                {
                                    variant === "REGISTER" &&
                                    <Input placeholder="Confirm your password" icon={RiLockPasswordLine} register={register} id="confirmPassword" type="password" errors={errors} disabled={isLoading} />
                                }
                                <Button type="submit" fullWidth disabled={isLoading}>{variant === "REGISTER" ? 'Create' : 'Sign In'}</Button>
                            </form>
                            <div className="my-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-900" />
                                    </div>
                                    <div className="relative flex justify-center text-center">
                                        <span className="bg-white text-sm px-2 text-gray-500">
                                            or Continue with
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="my-6 flex gap-2">
                                <SocialButton icon={BsGithub} onClick={() => socialLogin('github')} label="Github" disabled={isLoading} />
                                <SocialButton icon={BsGoogle} onClick={() => socialLogin('google')} label="Google" disabled={isLoading} />
                            </div>
                            <div>
                                <div className="flex gap-2 justify-center text-sm  px-2 text-gray-500">
                                    <div>
                                        {variant === 'LOGIN' ? 'New to Chat Me?' : 'Already have an account?'}
                                    </div>
                                    <div className="underline cursor-pointer font-semibold text-primary" onClick={toggleVariant}>
                                        {variant === 'LOGIN' ? 'Create an account' : 'Login here'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm