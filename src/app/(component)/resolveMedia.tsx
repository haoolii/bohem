import { ORIGIN } from "@/core/env";
import { resolveGetAction } from "../actions";
import { ResolvePasswordMedia } from "./resolvePasswordMedia";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  uniqueId: string;
};
export const ResolveMedia: React.FC<Props> = async ({ uniqueId }) => {
  const getJson = await resolveGetAction(uniqueId);

  const passwordRequired = getJson?.data?.passwordRequired;

  const imageUrl = `${ORIGIN}/o/${getJson?.data?.original || ""}`;

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
          <video controls className="max-w-full h-auto">
            <source src={imageUrl} type="video/mp4" />
            <source src={imageUrl} type="audio/mpeg" />
            您的瀏覽器不支援視頻播放。
          </video>
        </div>
      </div>
    );
  }
  return (
    <ResolvePasswordMedia uniqueId={uniqueId} prompt={getJson.data.prompt} />
  );
};
