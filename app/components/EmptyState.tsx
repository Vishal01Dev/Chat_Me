import { PiWechatLogoBold } from "react-icons/pi"

const EmptyState = () => {
    return (
        <div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-white">
            <div className="text-center items-center flex flex-col">
                <div className='flex flex-col items-center'>
                    <PiWechatLogoBold size={50} className="text-primary/50" />
                    <p className='text-lg font-extrabold text-primary/50'>Chat Me</p>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-primary/50">Select a chat or start a new conversation</h3>
            </div>
        </div>
    )
}

export default EmptyState