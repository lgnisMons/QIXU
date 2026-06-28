import * as React from "react";
import { cn } from "../lib/utils";

interface PageCTAProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  background?: "default" | "surface" | "primary" | "muted";
  spacing?: "sm" | "md" | "lg";
}

const PageCTA = React.forwardRef<HTMLDivElement, PageCTAProps>(
  (
    {
      title,
      description,
      background = "primary",
      spacing = "lg",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const bgClasses = {
      default: "bg-background",
      surface: "bg-surface",
      primary: "bg-primary text-primary-foreground",
      muted: "bg-muted",
    };

    const spacingClasses = {
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16",
      lg: "py-16 md:py-24",
    };

    return (
      <section
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          bgClasses[background],
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
              {title}
            </h2>
            {description && (
              <p
                className={cn(
                  "mt-4 text-lg",
                  background === "primary"
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                )}
              >
                {description}
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>
      </section>
    );
  }
);
PageCTA.displayName = "PageCTA";

export { PageCTA };
export type { PageCTAProps };
