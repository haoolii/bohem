"use client";

import { useEffect, useState } from "react";
import { MediaPreview } from "./mediaPreview";
import { MediaPlaceholder } from "./mediaPlaceholder";

type Props = {
    onChange: (file: File | null) => void;
};

export const MediaUploader: React.FC<Props> = ({ onChange }) => {

    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        onChange(file);
    }, [file])

    return (
        <div className="">
            {file ? (
                <MediaPreview file={file} />
            ) : (
                <MediaPlaceholder onChange={file => setFile(file)} />
            )}
        </div>
    );
}