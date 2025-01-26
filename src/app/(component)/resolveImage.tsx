import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ORIGIN } from "@/core/env";
import { resolveGetAction } from "../actions";
import { ResolvePasswordImage } from "./resolvePasswordImage";

type Props = {
  uniqueId: string;
};
export const ResolveImage: React.FC<Props> = async ({ uniqueId }) => {
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
          <Alert className="flex flex-col">
            <img src={imageUrl} />
          </Alert>
        </div>
        <pre>{JSON.stringify(getJson, null, 2)}</pre>
      </div>
    );
  }
  return (
    <ResolvePasswordImage uniqueId={uniqueId} prompt={getJson.data.prompt} />
  );
};
