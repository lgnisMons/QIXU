import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  /** Internal flag for home icon — not meant for external use */
  _isHome?: boolean;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, showHome = true, className, ...props }, ref) => {
    const allItems: BreadcrumbItem[] = showHome
      ? [{ label: "首页", href: "/", _isHome: true }, ...items]
      : items;

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("flex items-center text-sm text-muted-foreground", className)}
        {...props}
      >
        <ol className="flex items-center gap-1.5">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
                )}
                {isLast || !item.href ? (
                  <span
                    className={cn(
                      isLast && "font-medium text-foreground"
                    )}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
