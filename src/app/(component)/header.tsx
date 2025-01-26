import Link from "next/link";

export const Header = () => {
  return (
    <header className="border-b">
      <div className="max-w-5xl mx-auto flex gap-4">
        <a href="#" className="p-2 font-semibold text-2xl">
          Bohem
        </a>
        <nav className="flex gap-4 items-center">
          <Link href={"/url"} className="p-2">
            縮短網址
          </Link>
          <Link href={"/media"} className="p-2">
            影片縮網址
          </Link>
          <Link href={"/image"} className="p-2">
            照片縮網址
          </Link>
          <a href="#" className="p-2">
            隱私權政策
          </a>
        </nav>
      </div>
    </header>
  );
};
