import { resolveGetAction } from "../actions";
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

  const getJson = await resolveGetAction(uniqueId);

  switch (getJson?.data?.type) {
    case "image":
      return <ResolveImage uniqueId={uniqueId} />;
    case "media":
      return <ResolveMedia uniqueId={uniqueId} />
    case "url":
      return <ResolveUrl uniqueId={uniqueId} />;
    default:
      return <>Not Found</>;
  }
}
