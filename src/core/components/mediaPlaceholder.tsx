"use client";

import { VideoIcon } from "@radix-ui/react-icons";
import { AllowedFileTypes } from "../constant";

type Props = {
    onChange: (file: File | null) => void;
};

export const MediaPlaceholder: React.FC<Props> = ({ onChange }) => {
    return <label className="cursor-pointer">
        <div className="border border-dashed border-secondary-foreground bg-secondary pb-8 pt-10 rounded">
            <div className="flex flex-col justify-center items-center">
                <div className="flex gap-2 items-center mb-4">
                    <VideoIcon width={24} height={24} />
                    <span className="font-semibold text-secondary-foreground">
                        {("upload placeholder")}
                    </span>
                </div>
                <span className="text-sm font-medium text-secondary-foreground">
                    <span>拖曳或點選即可上傳</span>
                </span>
                <span className="text-secondary-foreground/40 text-sm mt-1">
                    {AllowedFileTypes.map((type) => (
                        <span key={type}>{type}</span>
                    ))}
                </span>
            </div>
        </div>
        <input
            hidden
            name="file"
            type="file"
            onChange={(e) => {
                if (e.target.files && e.target.files.length) {
                    onChange(e.target.files[0])
                }
            }}
            accept={AllowedFileTypes.join(",")}
        />
    </label>
}