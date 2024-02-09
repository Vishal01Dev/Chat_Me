"use client"

import clsx from "clsx";

interface ButtonProps {
    children?: React.ReactNode
    type?: "button" | "submit" | 'reset' | undefined;
    fullWidth?: boolean;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, type, danger, disabled, onClick, fullWidth, secondary }) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled}
            className={clsx("flex justify-center items-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                fullWidth && 'w-full',
                disabled && 'cursor-not-allowed bg-primary/50 hover:bg-primary/50',
                secondary ? 'bg-tertiary text-black hover:bg-tertiary/90' : 'text-white',
                danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
                !secondary && !danger && 'bg-primary hover:bg-primary/90 focus-visible:outline-primary'
            )}
        >{children}</button>
    )
}

export default Button