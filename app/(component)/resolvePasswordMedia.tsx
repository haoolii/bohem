"use client";

import { useMemo, useState } from "react";
import { ORIGIN } from "../(core)/env";
import { resolvePostAction } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  uniqueId: string;
  prompt: string;
};
export const ResolvePasswordMedia: React.FC<Props> = ({ uniqueId, prompt }) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [postJson, setPostJson] = useState<any>();

  const submitPassword = async () => {
    setIsLoading(true);
    const json = await resolvePostAction(uniqueId, password);
    setPostJson(json);
    setIsLoading(false);
  };

  const mediaUrl = useMemo(() => {
    if (!postJson) return "";

    return `${ORIGIN}/o/${postJson?.data?.original || ""}`;
  }, [postJson]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-semibold text-2xl">請輸入密碼解鎖</h1>
      <Alert>
        <AlertTitle>內容說明</AlertTitle>
        <AlertDescription>{prompt || "無說明內容"}</AlertDescription>
      </Alert>
      {mediaUrl ? (
        <div className="flex flex-col gap-2">
          <video controls className="max-w-full h-auto">
            <source src={mediaUrl} type="video/mp4" />
            <source src={mediaUrl} type="audio/mpeg" />
            您的瀏覽器不支援視頻播放。
          </video>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Input
            type="password"
            placeholder="輸入密碼"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={() => submitPassword()}
            disabled={isLoading}
          >
            {isLoading ? "送出中" : "送出"}
          </Button>
        </div>
      )}
    </div>
  );
};
