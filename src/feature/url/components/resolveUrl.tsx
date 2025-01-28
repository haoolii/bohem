import { redirect } from "next/navigation";

type Props = {
  originals: Array<{ content: string }>;
};
export const ResolveUrl: React.FC<Props> = async ({ originals }) => {
  if (originals && originals.length) {
    redirect(originals[0].content);
  }

  return <></>;
};
