"use client";

import { useMemo } from "react";

type Props = {
    file?: File | null;
    url?: string | null;
};

export const MediaPreview: React.FC<Props> = ({ file, url }) => {

    const srcObjectURL = useMemo(
        () => {
            if (file) {
                return URL.createObjectURL(file);
            }
            if (url) {
                return url;
            }

            return ""
        },
        [file, url]
    );


    return <div className="flex justify-center items-center">
        <video controls className="max-h-96">
            <source src={srcObjectURL} type="video/mp4" />
            <source src={srcObjectURL} type="audio/mpeg" />
            {("browser not support")}
        </video>
    </div>
}