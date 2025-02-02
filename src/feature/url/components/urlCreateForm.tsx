"use client";
import { useState } from "react";
import { ORIGIN } from "@/core/env";
import { useTranslations } from "next-intl";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon, ReloadIcon } from "@radix-ui/react-icons";

// requests
import { postShortenUrl } from "@/core/requests";

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

  const shortLink = `${ORIGIN}/${uniqueId}`;

  return (
    <div>
      {!uniqueId ? (
        <div>
          <div className="flex justify-center py-8">
            <h1 className="text-2xl font-semibold mb-10">
              {"歡迎來到 Bohem 免費縮網址"}
            </h1>
          </div>
          <div className="flex flex-col gap-10 items-center">
            <Input
              placeholder={"輸入要縮短的網址 https://"}
              className="bg-white rounded-2xl overflow-hidden py-4 px-6 text-black inline-block max-w-screen-md"
              onChange={(e) => setUrl(e.target.value)}
            />
            <div className="flex justify-center">
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
          <h2 className="text-xl font-semibold">您的縮網址</h2>
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
                setUrl("");
              }}
            >
              <span>再縮短一個</span>
              <ReloadIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
