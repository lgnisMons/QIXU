import * as React from "react";
import { cn } from "../lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("py-12 md:py-20 text-center", className)} {...props}>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {description}
          </p>
        )}
        {children}
      </div>
    );
  }
);
PageHeader.displayName = "PageHeader";

export { PageHeader };
export type { PageHeaderProps };
