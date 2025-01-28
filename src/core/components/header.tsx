import { useTranslations } from "next-intl";
import Link from "next/link";

// components
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Language from "./language";

export const Header = () => {
  const t = useTranslations();
  return (
    <header className="border-b">
      <div className="max-w-5xl mx-auto flex justify-between gap-4 items-center px-2">
        <div className="flex gap-4 items-center">
          <Link href={"/"} className="p-2 font-semibold text-2xl">
            Bohem
          </Link>
          <nav className="hidden md:flex gap-4 items-center">
            <Link href={"/url"} className="p-2">
              {t("Shorten URL")}
            </Link>
            <Link href={"/media"} className="p-2">
              {t("Shorten video link")}
            </Link>
            <Link href={"/image"} className="p-2">
              {t("Shorten image link")}
            </Link>
          </nav>
        </div>
        <Language />
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="p-2 border rounded-md">
              <HamburgerMenuIcon width={18} height={18} />
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>
                  <Link href={"/"}>Bohem</Link>
                </SheetTitle>
                <SheetDescription className="flex gap-4 items-center justify-center">
                  <Link href={"/url"} className="p-2">
                    縮短網址
                  </Link>
                  <Link href={"/media"} className="p-2">
                    影片縮網址
                  </Link>
                  <Link href={"/image"} className="p-2">
                    照片縮網址
                  </Link>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
