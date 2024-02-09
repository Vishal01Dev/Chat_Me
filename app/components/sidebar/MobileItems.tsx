"use client"

import clsx from "clsx";
import Link from "next/link";

interface MobileItemsProps {
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
}


const MobileItems: React.FC<MobileItemsProps> = ({ label, icon: Icon, onClick, href, active }) => {


    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }


    return (
        <Link href={href} onClick={handleClick} className={clsx(`group flex gap-x-3 text-sm leading-6  font-semibold w-full justify-center p-3 rounded-md bg-gray-100 text-gray-500 hover:text-black hover:bg-gray-100`, active && `bg-primary text-white`)}><Icon className="w-6 h-6" /></Link>
    )
}

export default MobileItems