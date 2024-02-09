"use client"

import clsx from "clsx"
import { IconType } from "react-icons"

interface SocialButtonProps {
    icon: IconType
    label: string
    onClick: () => void
    disabled: boolean
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon: Icon, onClick, label, disabled }) => {
    return (
        <button onClick={onClick} disabled={disabled} className={clsx("inline-flex w-full justify-center rounded-md px-4 py-2 shadow-sm hover:bg-gray-200 bg-tertiary text-primary  focus:outline-offset-0",
        disabled && 'cursor-not-allowed bg-gray-primary/5 border border-primary'
        )}>
            <div className="flex gap-x-2 items-center">
                <Icon size={20} />
                <span className="text-base font-semibold">
                    {label}
                </span>
            </div>
        </button>
    )
}

export default SocialButton