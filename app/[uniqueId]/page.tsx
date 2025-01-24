import { PasswordForm } from "../(component)/passwordForm";
import { getResolve, postResolve } from "../actions";

export default async function Unique({
  params,
}: {
  params: Promise<{ uniqueId: string }>;
}) {
  const { uniqueId } = await params;

  if (!uniqueId) return <></>;

  const getJson = await getResolve(uniqueId);

  if (getJson?.data?.passwordRequired) {
    return (
      <div>
        <h1>Need password</h1>
        <PasswordForm uniqueId={uniqueId} />
      </div>
    );
  }

  return <div className="">uniqueId: {uniqueId}</div>;
}
