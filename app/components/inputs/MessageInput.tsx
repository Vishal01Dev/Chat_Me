"use client"
import { FieldValues, UseFormRegister } from "react-hook-form";
import { MdOutlineEmojiEmotions } from "react-icons/md";

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useState } from "react";

interface MessageInputProps {
    id: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>
    text: string
    setText: (value: string) => void
}

const MessageInput: React.FC<MessageInputProps> = ({ id, required, type, placeholder, register, text, setText }) => {

    const [showEmoji, setShowEmoji] = useState(false)


    const addEmoji = (e: any) => {
        const sym = e.unified.split("_");
        const codeArray: any = [];

        sym.forEach((el: any) => {
            const codePoint = parseInt(el, 16);
            if (!isNaN(codePoint)) {
                codeArray.push(codePoint);
            }
        });

        if (codeArray.length > 0) {
            let emoji = String.fromCodePoint(...codeArray);
            setText(text + emoji);
        } else {
            console.error("Invalid Unicode code points:", sym);
        }
    };


    return (
        <div className="relative w-full flex items-center gap-x-4">
            {
                showEmoji &&
                <div className="absolute bottom-[58px] max-sm:bottom-[53px] max-sm:!-left-12">
                    <Picker data={data} onEmojiSelect={addEmoji} maxFrequentRows={0} className="w-full" navPosition="bottom" theme="light" />
                </div>
            }
            <button type="button" onClick={() => setShowEmoji(!showEmoji)}>
                <MdOutlineEmojiEmotions size={28} className="text-primary" />
            </button>
            <input type={type} id={id} autoComplete={id} required={required} placeholder={placeholder} {...register('message')} value={text} onChange={(e) => setText(e.target.value)} className="text-black py-2 px-4 bg-neutral-100 w-full rounded-full outline-none font-medium max-sm:text-sm" />
        </div>
    )
}

export default MessageInput