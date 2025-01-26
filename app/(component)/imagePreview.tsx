"use client";
import { Button } from "@/components/ui/button";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { useEffect, useMemo, useState } from "react";

const allowedFileTypes = [".jpg", ".jpeg", ".png", ".gif"];

type Props = {
  onChange: (file: File | null) => void;
};
export const ImagePreview: React.FC<Props> = ({ onChange }) => {
  const [file, setFile] = useState<File | null>(null);

  const srcObjectURL = useMemo(
    () => (file ? URL.createObjectURL(file) : ''),
    [file]
  );

  useEffect(() => {
    onChange(file);
  }, [file]);

  return (
    <div>
      {file ? (
        <div className="mt-4 w-full flex flex-col items-center gap-4 justify-center">
          <img src={srcObjectURL} alt="Preview" className="max-w-full h-auto" />
          <Button variant="destructive" onClick={() => setFile(null)}>
            重新選擇
          </Button>
        </div>
      ) : (
        <label className="cursor-pointer">
          <div className="border border-gray-300 p-10 rounded">
            <div className="flex justify-center items-center gap-2">
              <FilePlusIcon width={24} height={24} />
              <span>上傳圖片</span>
              <span className="text-sm font-medium text-gray-500">
                {allowedFileTypes.map((type) => (
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
              e.target.files && setFile(e.target.files[0]);
            }}
            accept={allowedFileTypes.join(",")}
          />
        </label>
      )}
    </div>
  );
};
