"use client";

import { useRouter } from "next/navigation";

export default function Language() {
  const router = useRouter();

  const changeLocale = (locale: string) => {
    document.cookie = `locale=${locale}; path=/;`;
    router.refresh(); // 重新加載頁面
  };

  return (
    <div>
      <button onClick={() => changeLocale("en")}>English</button>
      <button onClick={() => changeLocale("zh-TW")}>中文</button>
    </div>
  );
}
