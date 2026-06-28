import * as React from "react";
import { cn } from "@qixu/ui/utils";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

export function PageContainer({
  className,
  size = "lg",
  children,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "sm" && "max-w-2xl",
        size === "md" && "max-w-4xl",
        size === "lg" && "max-w-6xl",
        size === "xl" && "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export function PageHeader({
  title,
  description,
  className,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn("py-12 md:py-20 text-center", className)} {...props}>
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

interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <div className="min-h-[60vh]">
      <PageContainer>
        <PageHeader title={title} description={description}>
          {icon && <div className="mt-6 flex justify-center text-primary">{icon}</div>}
        </PageHeader>
        <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
          <p className="text-sm text-muted-foreground">
            此页面正在建设中，敬请期待
          </p>
        </div>
      </PageContainer>
    </div>
  );
}
