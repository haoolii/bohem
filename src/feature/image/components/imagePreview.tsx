"use client";
import { Button } from "@/components/ui/button";
import { FilePlusIcon, ImageIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

const allowedFileTypes = [".jpg", ".jpeg", ".png", ".gif"];

type Props = {
  onChange: (file: File | null) => void;
};
export const ImagePreview: React.FC<Props> = ({ onChange }) => {
  const t = useTranslations("Image feature");
  const [file, setFile] = useState<File | null>(null);

  const srcObjectURL = useMemo(
    () => (file ? URL.createObjectURL(file) : ""),
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
            {t("reselect file")}
          </Button>
        </div>
      ) : (
        <label className="cursor-pointer">
          <div className="border border-dashed border-secondary-foreground bg-secondary pb-8 pt-10 rounded">
            <div className="flex flex-col justify-center items-center">
              <div className="flex gap-2 items-center mb-4">
                <ImageIcon width={24} height={24} />
                <span className="font-semibold text-secondary-foreground">
                  {t("upload placeholder")}
                </span>
              </div>
              <span className="text-sm font-medium text-secondary-foreground">
                <span>拖曳或點選即可上傳</span>
              </span>
              <span className="text-secondary-foreground/40 text-sm mt-1">
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
              if (e.target.files && e.target.files.length) {
                setFile(e.target.files[0]);
              }
            }}
            accept={allowedFileTypes.join(",")}
          />
        </label>
      )}
    </div>
  );
};
