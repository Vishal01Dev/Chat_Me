"use client"

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";



interface InputProps {
    placeholder: string;
    id: string;
    icon: IconType
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ placeholder, id, type, icon: Icon, errors, register, required, disabled }) => {
    return (
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Icon size={20} className="text-primary" />
            </div>
            <input type={type} id={id} autoComplete={id} disabled={disabled} {...register(id, { required })} placeholder={placeholder}
                className={clsx("form-input w-full block rounded-md border-0 bg-tertiary border-primary font-medium outline-none focus:outline-none focus:ring-0 py-1.5 pl-11 text-primary placeholder:text-primary/70 placeholder:text-sm",
                    disabled && 'border border-primary bg-primary/5'
                )}
            />
        </div>
    )
}

export default Input