import { redirect } from "next/navigation";

type Props = {
  original: string;
};
export const ResolveUrl: React.FC<Props> = async ({ original }) => {
  redirect(original);
};
