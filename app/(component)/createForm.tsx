"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { create } from "../actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const expireInList = [
  {
    label: "5 minutes",
    value: 5 * 60 * 1000,
  },
  {
    label: "30 minutes",
    value: 30 * 60 * 1000,
  },
  {
    label: "1 hour",
    value: 60 * 60 * 1000,
  },
  {
    label: "3 hours",
    value: 3 * 60 * 60 * 1000,
  },
  {
    label: "24 hours",
    value: 24 * 60 * 60 * 1000,
  },
];

export const CreateForm: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordRequired, setPasswordRequire] = useState(false);
  const [shortenInfo, setShortenInfo] = useState();

  const location = window.location;

  const handleSubmit = async (form: FormData) => {
    try {
      setIsLoading(true);
      const response = await create(form); // 調用伺服器端 action
      setShortenInfo(response);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-lg mx-auto">
      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            await handleSubmit(formData); // 使用客戶端函數
          }}
      >
        <div>
          <label htmlFor="prompt">Prompt</label>
          <Input name="prompt" id="prompt" />
        </div>
        <div>
          <label htmlFor="expireIn">ExpireIn</label>
          <Select name="expireIn">
            <SelectTrigger id="expireIn">
              <SelectValue placeholder="Select expire time" />
            </SelectTrigger>
            <SelectContent>
              {expireInList.map((expireIn) => (
                <SelectItem key={expireIn.value} value={`${expireIn.value}`}>
                  {expireIn.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="passwordRequired">Require Password</label>
          <Checkbox
            id="passwordRequired"
            name="passwordRequired"
            checked={passwordRequired}
            onClick={() => {
              setPasswordRequire(!passwordRequired);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <Input name="password" id="password" disabled={!passwordRequired} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="file">Photo</label>
          <Input name="file" type="file" />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : "Submit"}
        </Button>
      </form>
      <div className="mt-10">
        <pre>
            {JSON.stringify(shortenInfo, null, 2)}
        </pre>
        {shortenInfo && (
          <div>
            <h2>Shorten Info</h2>
            <Link
              href={`${location.href}${(shortenInfo as any)?.data?.uniqueId}`}
              target="_blank"
            >
              {`${location.href}${(shortenInfo as any)?.data?.uniqueId}`}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
