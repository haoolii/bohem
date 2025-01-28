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

export const MediaCreateForm = () => {
  const t = useTranslations("Media feature");

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [passwordRequired, setPasswordRequired] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [expireIn, setExpireIn] = useState<number>(24 * 60 * 60 * 1000);
  const [prompt, setPrompt] = useState<string>("");

  const [uniqueId, setUniqueId] = useState<string>("");

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
  return (
    <div>
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
            <div>
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
              <SelectValue placeholder="Select expire time" />
            </SelectTrigger>
            <SelectContent>
              {ExpireInList.map((expireIn) => (
                <SelectItem key={expireIn.value} value={`${expireIn.value}`}>
                  {expireIn.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <Button className="w-full" onClick={submit} disabled={isLoading}>
          {isLoading ? t("submit loading") : t("submit")}
        </Button>

        {uniqueId && (
          <div className="py-8 flex flex-col items-center gap-2 mt-10 border-t-2">
            <h2 className="font-semibold text-2xl">產生短網址成功</h2>
            <h4>您的影片音訊短網址</h4>
            <Link
              target="_blank"
              href={`${ORIGIN}/${uniqueId}`}
            >{`${ORIGIN}/${uniqueId}`}</Link>
          </div>
        )}
        <div className={"h-64"}></div>
      </div>
    </div>
  );
};
