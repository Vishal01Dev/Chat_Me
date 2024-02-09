"use client"

import React, { Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { ClipLoader } from 'react-spinners'

const LoadingModel = () => {
    return (
        <Transition.Root show as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => { }}>
                <Transition.Child as={Fragment}
                    enter="ease-in duration-300"
                    enterFrom="opacity-0"
                    enterTo='opacity-100'
                    leave="ease-in duration-300"
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-100 bg-opacity-80 transition-opacity' />

                </Transition.Child>
                <div className='fixed inset-0 z-10 overflow-y-auto'>
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Dialog.Panel>
                            <ClipLoader size={60} color='#21605d' />
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default LoadingModel