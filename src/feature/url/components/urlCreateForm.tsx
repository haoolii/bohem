"use client";
import { useState } from "react";
import { ORIGIN } from "@/core/env";
import Link from "next/link";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// actions
import { useTranslations } from "next-intl";
import { postShortenUrl } from "@/app/requests";

export const UrlCreateForm = () => {
  const t = useTranslations("URL feature");
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState<string | null>();
  const [uniqueId, setUniqueId] = useState<string>("");

  const submit = async () => {
    try {
      setIsLoading(true);

      if (!url) return;

      const json = await postShortenUrl({
        content: url,
        type: "url",
        expireIn: 0,
      });

      const uniqueId = json?.data?.uniqueId;

      setUniqueId(uniqueId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Input
          placeholder={t("url input placeholder")}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          className="w-full"
          onClick={() => submit()}
          disabled={isLoading}
        >
          {isLoading ? t("submit loading") : t("submit")}
        </Button>
      </div>
      {uniqueId && (
        <div className="py-8 flex flex-col items-center gap-<2 mt-10 border-t-2">
          <h2 className="font-semibold text-2xl">產生短網址成功</h2>
          <h4>您的短網址</h4>
          <Link
            target="_blank"
            href={`${ORIGIN}/${uniqueId}`}
          >{`${ORIGIN}/${uniqueId}`}</Link>
        </div>
      )}
    </div>
  );
};
