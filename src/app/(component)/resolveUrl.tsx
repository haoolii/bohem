import { redirect } from 'next/navigation';
import { resolveGetAction } from '../actions';

type Props = {
  uniqueId: string;
};
export const ResolveUrl: React.FC<Props> = async ({ uniqueId }) => {

  const getJson = await resolveGetAction(uniqueId);

  if (!getJson || !getJson.data || !getJson.data.original) {
    return <></>
  }

  const original = getJson.data.original;

  redirect(original);

  return null;
};
