import { GetShortenAction } from "../actions";
import { ResolveImage } from "@/feature/image/components/resolveImage";
import { ResolveUrl } from "@/feature/url/components/resolveUrl";
import { ResolveMedia } from "@/feature/media/components/resolveMedia";
import { Code } from "@/core/code";

export default async function Unique({
  params,
}: {
  params: Promise<{ uniqueId: string }>;
}) {
  const { uniqueId } = await params;

  if (!uniqueId) return <></>;

  const getJson = await GetShortenAction(uniqueId);

  if (getJson.code === Code.RECORD_EXPIRED) {
    return <div>Expired</div>;
  }
  console.log('getJson', getJson)
  switch (getJson?.data?.type) {
    case "image":
      return <ResolveImage uniqueId={uniqueId} />;
    case "media":
      return <ResolveMedia uniqueId={uniqueId} />;
    case "url":
      return <ResolveUrl originals={getJson.data.originals} />;
    default:
      return <>Not Found</>;
  }
}
