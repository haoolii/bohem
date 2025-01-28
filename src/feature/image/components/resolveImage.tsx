import { GetShortenAction } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ORIGIN } from "@/core/env";
import { ResolvePasswordImage } from "./resolvePasswordImage";

type Props = {
  uniqueId: string;
};
export const ResolveImage: React.FC<Props> = async ({ uniqueId }) => {
  const getJson = await GetShortenAction(uniqueId);

  const passwordRequired = getJson?.data?.passwordRequired;
  const originals = getJson?.data?.originals;

  if (!passwordRequired || (passwordRequired && originals)) {
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
            const imageUrl = `${ORIGIN}/p/o/${original?.content || ""}`;
            return (
              <Alert className="flex flex-col" key={imageUrl}>
                <img src={imageUrl} />
              </Alert>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <ResolvePasswordImage uniqueId={uniqueId} prompt={getJson.data.prompt} />
  );
};
