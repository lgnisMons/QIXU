"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@qixu/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@qixu/ui/sheet";
import { Separator } from "@qixu/ui/separator";
import { cn } from "@qixu/ui/utils";
import { mainNav } from "@/lib/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight text-foreground">
            QIXU
          </span>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            启序
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 items-center justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="flex flex-1 items-center justify-end gap-2 lg:flex-none">
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/assessment">开始测评</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">成长空间</Link>
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="打开菜单"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px]">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">QIXU</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      启序
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <Separator className="my-4" />
              <nav className="flex flex-col gap-1">
                {mainNav.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname?.startsWith(item.href);
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                          isActive
                            ? "bg-accent text-foreground"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
              <Separator className="my-4" />
              <div className="flex flex-col gap-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/assessment" onClick={() => setOpen(false)}>
                    开始测评
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    进入成长空间
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
