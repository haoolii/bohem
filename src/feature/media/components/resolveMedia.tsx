
import { GetShortenAction } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ORIGIN } from "@/core/env";
import { ResolvePasswordMedia } from "./resolvePasswordMedia";
import { MediaPreview } from "@/core/components/mediaPreview";

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
            return <MediaPreview key={mediaUrl} url={mediaUrl} />;
          })}
        </div>
      </div>
    );
  }
  return (
    <ResolvePasswordMedia uniqueId={uniqueId} prompt={getJson.data.prompt} />
  );
};
