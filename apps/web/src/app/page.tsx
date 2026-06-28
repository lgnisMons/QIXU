import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@qixu/ui/button";
import { Badge } from "@qixu/ui/badge";

export default function Home() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="mr-1.5 h-3 w-3" />
            AI 时代学习成长平台
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            启于今日，
            <br />
            <span className="text-primary">序向未来</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            启蒙 · 序章 · 未来。QIXU 启序帮助学习者建立属于自己的
            <span className="font-medium text-foreground">Growth Sequence（成长序列）</span>，
            让 AI 与导师陪伴你的学习旅程。
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="min-w-[160px]">
              <Link href="/ai">
                开始体验
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="min-w-[160px]">
              <Link href="/about">了解更多</Link>
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-success" />
              AI 学习助手
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              导师全程指导
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-warning" />
              成长档案
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
