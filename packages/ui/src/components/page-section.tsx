import * as React from "react";
import { cn } from "../lib/utils";

interface PageSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  background?: "default" | "surface" | "muted";
  spacing?: "sm" | "md" | "lg";
}

const PageSection = React.forwardRef<HTMLElement, PageSectionProps>(
  (
    {
      title,
      description,
      background = "default",
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
        className={cn(bgClasses[background], spacingClasses[spacing], className)}
        {...props}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {title && (
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {title}
              </h2>
              {description && (
                <p className="mt-4 text-muted-foreground">{description}</p>
              )}
            </div>
          )}
          {children}
        </div>
      </section>
    );
  }
);
PageSection.displayName = "PageSection";

export { PageSection };
export type { PageSectionProps };
