"use client";
import { useState } from "react";
import { postResolve } from "../actions";

type Props = {
  uniqueId: string;
};
export const PasswordForm: React.FC<Props> = ({ uniqueId }) => {
  const [res, setRes] = useState();
  return (
    <>
      <form
        action={async (form: FormData) => {
          const password = form.get("password")?.toString();
          if (password) {
            const json = await postResolve(uniqueId, password);
            setRes(json as any);
          }
        }}
        method="POST"
        encType="multipart/form-data"
      >
        <input name="password" placeholder={`${uniqueId} _ password`} />
        <button className="py-2 px-4 bg-gray-100" type="submit">
          Submit
        </button>
      </form>
      <pre>{JSON.stringify(res, null, 2)}</pre>
      {
        (res as any)?.data?.original && <img src={`/assets/${(res as any)?.data?.original}`} />
      }

    </>
  );
};
