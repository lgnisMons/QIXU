import * as React from "react";
import { cn } from "../lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: "default" | "surface" | "primary" | "muted";
  spacing?: "sm" | "md" | "lg" | "xl";
  container?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      background = "default",
      spacing = "lg",
      container = true,
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
      xl: "py-24 md:py-32",
    };

    return (
      <section
        ref={ref}
        className={cn(bgClasses[background], spacingClasses[spacing], className)}
        {...props}
      >
        {container ? <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div> : children}
      </section>
    );
  }
);
Section.displayName = "Section";

const SectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mx-auto mb-12 max-w-2xl text-center", className)}
    {...props}
  />
));
SectionHeader.displayName = "SectionHeader";

const SectionTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("text-3xl font-bold tracking-tight md:text-4xl", className)} {...props} />
));
SectionTitle.displayName = "SectionTitle";

const SectionDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-4 text-lg text-muted-foreground", className)}
    {...props}
  />
));
SectionDescription.displayName = "SectionDescription";

export { Section, SectionHeader, SectionTitle, SectionDescription };
