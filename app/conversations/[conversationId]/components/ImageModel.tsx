"use client"

import Model from "@/app/components/model/Model";
import Image from "next/image";

interface ImageModelProps {
    src: string | null;
    isOpen?: boolean;
    onClose: () => void;
}

const ImageModel: React.FC<ImageModelProps> = ({ isOpen, src, onClose }) => {
    if (!src) {
        return null
    }

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <div className="w-80 h-80 mx-auto">
                <Image src={src} alt="image" className="!object-contain !w-full !h-full mx-auto" width={320} height={320} />
            </div>
        </Model>
    )
}

export default ImageModel