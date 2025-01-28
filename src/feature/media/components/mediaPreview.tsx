"use client";
import { Button } from "@/components/ui/button";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

const allowedFileTypes = [".mp3", ".mp4"];

type Props = {
  onChange: (file: File | null) => void;
};
export const MediaPreview: React.FC<Props> = ({ onChange }) => {
  const t = useTranslations("Media feature");

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
          <video controls className="max-w-full h-auto">
            <source src={srcObjectURL} type="video/mp4" />
            <source src={srcObjectURL} type="audio/mpeg" />
            {t("browser not support")}
          </video>
          <Button variant="destructive" onClick={() => setFile(null)}>
            {t("reselect file")}
          </Button>
        </div>
      ) : (
        <label className="cursor-pointer">
          <div className="border border-gray-300 p-10 rounded">
            <div className="flex justify-center items-center gap-2">
              <FilePlusIcon width={24} height={24} />
              <span>{t("upload placeholder")}</span>
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
