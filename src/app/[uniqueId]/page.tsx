import { GetShortenAction } from "../actions";
import { ResolveImage } from "../(component)/resolveImage";
import { ResolveUrl } from "../(component)/resolveUrl";
import { ResolveMedia } from "../(component)/resolveMedia";

export default async function Unique({
  params,
}: {
  params: Promise<{ uniqueId: string }>;
}) {
  const { uniqueId } = await params;

  if (!uniqueId) return <></>;

  const getJson = await GetShortenAction(uniqueId);

  // return <>
  //   <pre>
  //     {JSON.stringify(getJson, null, 2)}
  //   </pre>
  // </>
  switch (getJson?.data?.type) {
    case "image":
      return <ResolveImage uniqueId={uniqueId} />;
    case "media":
      return <ResolveMedia uniqueId={uniqueId} />
    case "url":
      return <ResolveUrl originals={getJson.data.originals} />;
    default:
      return <>Not Found</>;
  }
}
