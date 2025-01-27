import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import Link from "next/link";

export const Header = () => {
  return (
    <header className="border-b">
      <div className="max-w-5xl mx-auto flex justify-between gap-4 items-center px-2">
        <div className="flex gap-4 items-center">
          <a href="#" className="p-2 font-semibold text-2xl">
            Bohem
          </a>
          <nav className="hidden md:flex gap-4 items-center">
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
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Button size="icon" variant="outline">
                <HamburgerMenuIcon width={24} height={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Bohem</SheetTitle>
                <SheetDescription>
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
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
