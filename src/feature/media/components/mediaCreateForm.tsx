"use client";

import "dotenv/config";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpireInList } from "@/core/constant";
import { useState } from "react";
import dayjs from "dayjs";
import { ORIGIN } from "@/core/env";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MediaPreview } from "@/feature/media/components/mediaPreview";
import { postShortenMedia } from "@/app/requests";
import { CopyIcon, ReloadIcon } from "@radix-ui/react-icons";

export const MediaCreateForm = () => {
  const t = useTranslations("Media feature");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [passwordRequired, setPasswordRequired] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [expireIn, setExpireIn] = useState<number>(24 * 60 * 60);
  const [prompt, setPrompt] = useState<string>("");

  const [uniqueId, setUniqueId] = useState<string>("");
  // const [originals, setOriginals] = useState<any[]>([]);

  const submit = async () => {
    if (!files.length) return;

    try {
      setIsLoading(true);
      if (files) {
        const result = await postShortenMedia({
          files: files,
          type: "media",
          prompt,
          passwordRequired,
          password: passwordRequired ? password : "",
          expireIn,
        });

        setUniqueId(result.data.uniqueId);
      }
      setIsLoading(false);
    } catch (err) {
      console.log("err client", err);
      setIsLoading(false);
    }
  };

  const shortLink = `${ORIGIN}/${uniqueId}`;

  return (
    <div>
      {!uniqueId ? (
        <div>
          <div className="flex justify-center py-8">
            <h1 className="text-2xl font-semibold mb-10">
              {"歡迎來到 Bohem 免費縮影片網址"}
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <MediaPreview
              onChange={(file) => {
                if (file) {
                  setFiles([file]);
                } else {
                  setFiles([]);
                }
              }}
            />
            <div className="flex">
              <label className="flex gap-2 items-center">
                <Checkbox
                  checked={passwordRequired}
                  onCheckedChange={(e) => setPasswordRequired(!!e.valueOf())}
                />
                <span>{t("require password label")}</span>
              </label>
            </div>
            {passwordRequired && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span>快捷密碼</span>
                  <Button
                    className="w-20"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setPassword(dayjs().format("MMDD"));
                    }}
                  >
                    {t("today date")}
                  </Button>
                </div>
                <Input
                  placeholder={t("password input placeholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
            <label className="flex flex-col gap-2">
              <span>{t("prompt label")}</span>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t("prompt input placeholder")}
                rows={4}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>{t("expire label")}</span>
              <Select
                value={`${expireIn}`}
                onValueChange={(value) => setExpireIn(Number(value))}
              >
                <SelectTrigger id="expireIn">
                  <SelectValue placeholder="請選擇有效時間" />
                </SelectTrigger>
                <SelectContent>
                  {ExpireInList.map((expireIn) => (
                    <SelectItem
                      key={`${expireIn.value}`}
                      value={`${expireIn.value}`}
                    >
                      {expireIn.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
            <div className="flex justify-center mt-8">
              <Button
                size="lg"
                onClick={() => submit()}
                disabled={isLoading}
                className="w-32"
              >
                {isLoading ? t("submit loading") : t("submit")}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center py-10">
          <h1 className="text-2xl font-semibold">{"產生短網址成功"}</h1>
          <h2 className="text-xl font-semibold">您的照片(圖片)短網址</h2>
          <div className="flex flex-col gap-4">
            {files.map((file) => {
              const objectUrl = file ? URL.createObjectURL(file) : "";
              return (
                <video key={file.name} controls className="max-w-full h-auto">
                  <source src={objectUrl} type="video/mp4" />
                  <source src={objectUrl} type="audio/mpeg" />
                  {t("browser not support")}
                </video>
              );
            })}
          </div>
          <div className="bg-primary-foreground px-6 pl-10 py-4 rounded-full flex justify-center items-center gap-4 mt-4">
            <span className="tracking-wider">{shortLink}</span>
            <Button className="flex items-center">
              <span>複製</span> <CopyIcon />
            </Button>
          </div>

          <div className="mt-10">
            <Button
              size="lg"
              onClick={() => {
                setUniqueId("");
                setFiles([]);
              }}
            >
              <span>再上傳一個</span>
              <ReloadIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
