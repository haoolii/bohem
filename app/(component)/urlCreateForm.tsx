"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { shortenUrlAction } from "../actions";
import Link from "next/link";
import { ORIGIN } from "../(core)/env";

export const UrlCreateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState<string | null>();
  const [uniqueId, setUniqueId] = useState<string>("");

  const submit = async () => {
    try {
      setIsLoading(true);
      if (!url) return;
      const result = await shortenUrlAction({ url, type: "url", expireIn: 0 });
      setUniqueId(result.data.uniqueId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-10">縮短網址</h1>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="輸入要縮短的網址"
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          className="w-full"
          onClick={() => submit()}
          disabled={isLoading}
        >
          {isLoading ? "縮短中" : "縮短網址"}
        </Button>
      </div>
      {uniqueId && (
        <div className="py-8 flex flex-col items-center gap-2 mt-10 border-t-2">
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
