import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="font-semibold text-4xl">Hello World</h1>
      <div className="flex flex-col items-center gap-2">
        <Link href={"/url"} className="text-lg p-2 underline underline-offset-8">
          縮短網址
        </Link>
        <Link href={"/media"} className="text-lg p-2 underline underline-offset-8">
          影片縮網址
        </Link>
        <Link href={"/image"} className="text-lg p-2 underline underline-offset-8">
          照片縮網址
        </Link>
      </div>
    </div>
  );
}
