"use client"
import clsx from "clsx";
import Link from "next/link";

interface DesktopSidbarItemProps {
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
}


const DesktopSidbarItem: React.FC<DesktopSidbarItemProps> = ({ label, icon: Icon, href, onClick, active }) => {

    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }

    return (
        <li onClick={handleClick}>
            <Link href={href} className={clsx(`group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-700 hover:text-black hover:bg-gray-100`, active && `bg-primary !text-white hover:bg-primary hover:text-white`)}>
                <Icon className="w-5 h-5 shrink-0" />
                <span className="sr-only">{label}</span>
            </Link>
        </li >
    )
}

export default DesktopSidbarItem