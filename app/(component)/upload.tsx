"use client";

import { FormEvent, useState } from "react";
import { create } from "../actions";

export const Upload = () => {
  const [res, setRes] = useState<any>();
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <pre>
        {JSON.stringify(res, null, 2)}
      </pre>
      <form
        action={async (form: FormData) => {
          const resp = await create(form);
          setRes(resp);
        }}
        method="POST"
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-4 justify-center">
          <label className="flex flex-col items-start">
            <span>Prompt</span>
            <input name="prompt" className="border" placeholder="" />
          </label>
          <label className="flex flex-col items-start">
            <span>Require Password ?</span>
            <input name="passwordRequired" type="checkbox" placeholder="" />
          </label>
          <label className="flex flex-col items-start">
            <span>Password</span>
            <input name="password" className="border" placeholder="password" />
          </label>
          <label className="flex flex-col items-start">
            <span>File</span>
            <input name="file" type="file" placeholder="" />
          </label>
        </div>
        <div className="py-10">
          <button className="py-2 px-4 bg-gray-100" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
