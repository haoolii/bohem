"use client";
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
import { shortenMediaAction } from "../actions";
import { useState } from "react";
import dayjs from "dayjs";
import { ORIGIN } from "@/core/env";
import { ExpireInList } from '@/core/constant';
import Link from "next/link";
import { MediaPreview } from "./mediaPreview";
export const MediaCreateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>();
  const [passwordRequired, setPasswordRequired] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [expireIn, setExpireIn] = useState<number>(24 * 60 * 60 * 1000);
  const [prompt, setPrompt] = useState<string>("");

  const [uniqueId, setUniqueId] = useState<string>("");

  const submit = async () => {
    if (!file) return;

    try {
      setIsLoading(true);
      if (file) {
        const result = await shortenMediaAction({
          file,
          type: "media",
          prompt,
          passwordRequired,
          password: passwordRequired ? password : "",
          expireIn,
        });

        if (result) {
          setUniqueId(result.data.uniqueId);
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log("err client", err);
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-10">影片音訊短網址</h1>
      <div className="flex flex-col gap-4">
        <MediaPreview
          onChange={(file) => {
            setFile(file);
          }}
        />
        <div className="flex">
          <label className="flex gap-2 items-center">
            <Checkbox
              checked={passwordRequired}
              onCheckedChange={(e) => setPasswordRequired(!!e.valueOf())}
            />
            <span>需要密碼</span>
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
                今日日期
              </Button>
            </div>
            <Input
              placeholder={"請輸入密碼"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        <label className="flex flex-col gap-2">
          <span>說明內容</span>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="請輸入圖片說明內容"
            rows={4}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span>有效時間</span>
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
          {isLoading ? "上傳中.." : "上傳"}
        </Button>

        {uniqueId && (
          <div className="py-8 flex flex-col items-center gap-2 mt-10 border-t-2">
            <h2 className="font-semibold text-2xl">產生短網址成功</h2>
            <h4>您的影片、音訊網址</h4>
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
