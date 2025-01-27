import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ORIGIN } from "@/core/env";
import { GetShortenAction } from "../actions";
import { ResolvePasswordMedia } from "./resolvePasswordMedia";

type Props = {
  uniqueId: string;
};
export const ResolveMedia: React.FC<Props> = async ({ uniqueId }) => {
  const getJson = await GetShortenAction(uniqueId);

  const passwordRequired = getJson?.data?.passwordRequired;

  if (!passwordRequired) {
    return (
      <div className="flex flex-col gap-4">
        <Alert>
          <AlertTitle>內容說明</AlertTitle>
          <AlertDescription>
            {getJson?.data?.prompt || "無說明內容"}
          </AlertDescription>
        </Alert>
        <div className="flex flex-col gap-2">
          {getJson?.data?.originals?.map((original: { content: string }) => {
            const mediaUrl = `${ORIGIN}/p/o/${original?.content || ""}`;
            return (
              <Alert className="flex flex-col" key={mediaUrl}>
                <video controls className="max-w-full h-auto">
                  <source src={mediaUrl} type="video/mp4" />
                  <source src={mediaUrl} type="audio/mpeg" />
                  您的瀏覽器不支援視頻播放。
                </video>
              </Alert>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <ResolvePasswordMedia uniqueId={uniqueId} prompt={getJson.data.prompt} />
  );
};
