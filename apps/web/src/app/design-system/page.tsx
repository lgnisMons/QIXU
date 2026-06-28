import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Info,
  AlertTriangle,
  XCircle,
  Mail,
  Search,
  ChevronRight,
  Home,
  Palette,
  Type,
  Square,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@qixu/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@qixu/ui/card";
import { Input } from "@qixu/ui/input";
import { Badge } from "@qixu/ui/badge";
import { Separator } from "@qixu/ui/separator";
import { Container } from "@qixu/ui/container";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@qixu/ui/section";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export const metadata: Metadata = {
  title: "Design System - QIXU 启序",
  description: "QIXU Design System v1.0 - Design tokens and base components showcase",
};

const colorTokens = [
  { name: "background", className: "bg-background", textClass: "text-foreground", label: "--background" },
  { name: "foreground", className: "bg-foreground", textClass: "text-background", label: "--foreground" },
  { name: "primary", className: "bg-primary", textClass: "text-primary-foreground", label: "--primary" },
  { name: "primary-foreground", className: "bg-primary-foreground", textClass: "text-primary", label: "--primary-foreground" },
  { name: "secondary", className: "bg-secondary", textClass: "text-secondary-foreground", label: "--secondary" },
  { name: "muted", className: "bg-muted", textClass: "text-muted-foreground", label: "--muted" },
  { name: "muted-foreground", className: "bg-muted-foreground", textClass: "text-background", label: "--muted-foreground" },
  { name: "accent", className: "bg-accent", textClass: "text-accent-foreground", label: "--accent" },
  { name: "surface", className: "bg-surface", textClass: "text-surface-foreground", label: "--surface" },
  { name: "card", className: "bg-card", textClass: "text-card-foreground border border-border", label: "--card" },
  { name: "popover", className: "bg-popover", textClass: "text-popover-foreground border border-border", label: "--popover" },
  { name: "border", className: "bg-border", textClass: "text-foreground", label: "--border" },
  { name: "input", className: "bg-input", textClass: "text-foreground", label: "--input" },
  { name: "ring", className: "bg-ring", textClass: "text-primary-foreground", label: "--ring" },
];

const statusColors = [
  { name: "success", className: "bg-success text-success-foreground", icon: Check },
  { name: "warning", className: "bg-warning text-warning-foreground", icon: AlertTriangle },
  { name: "danger", className: "bg-danger text-danger-foreground", icon: XCircle },
  { name: "info", className: "bg-primary text-primary-foreground", icon: Info },
];

const shadows = [
  { name: "shadow-sm", className: "shadow-sm" },
  { name: "shadow", className: "shadow" },
  { name: "shadow-md", className: "shadow-md" },
  { name: "shadow-lg", className: "shadow-lg" },
  { name: "shadow-xl", className: "shadow-xl" },
];

const radii = [
  { name: "rounded-sm", className: "rounded-sm" },
  { name: "rounded-md", className: "rounded-md" },
  { name: "rounded-lg", className: "rounded-lg" },
  { name: "rounded-full", className: "rounded-full" },
];

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b border-border bg-surface">
        <Container>
          <div className="flex items-center justify-between py-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground">
                  QIXU 启序
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span>Design System</span>
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">Design System v1.0</h1>
              <p className="mt-1 text-muted-foreground">
                设计令牌与基础组件展示
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  返回首页
                </Link>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </div>

      <main className="py-12">
        <Container>
          {/* Quick Navigation */}
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Palette, title: "Colors", href: "#colors", desc: "语义色彩" },
              { icon: Type, title: "Typography", href: "#typography", desc: "字体排版" },
              { icon: Square, title: "Spacing", href: "#spacing", desc: "间距圆角" },
              { icon: Layers, title: "Components", href: "#components", desc: "基础组件" },
              { icon: Sparkles, title: "Motion", href: "#motion", desc: "动效规范" },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
              >
                <div className="rounded-md bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Colors Section */}
          <Section id="colors" background="surface" container={false} className="mb-12 rounded-xl">
            <SectionHeader className="mb-8">
              <SectionTitle>Colors 语义色彩</SectionTitle>
              <SectionDescription>
                所有颜色通过语义令牌引用，禁止在组件中硬编码颜色值。
              </SectionDescription>
            </SectionHeader>

            {/* Main color grid */}
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {colorTokens.map((token) => (
                <div
                  key={token.name}
                  className={`${token.className} ${token.textClass} rounded-lg p-4 shadow-sm`}
                >
                  <div className="text-sm font-medium">{token.name}</div>
                  <div className="mt-1 text-xs opacity-70">{token.label}</div>
                </div>
              ))}
            </div>

            <Separator className="my-8" />

            {/* Status colors */}
            <h3 className="mb-4 text-lg font-semibold">状态色 Status Colors</h3>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {statusColors.map((status) => (
                <div
                  key={status.name}
                  className={`flex items-center gap-3 rounded-lg p-4 ${status.className}`}
                >
                  <status.icon className="h-5 w-5" />
                  <span className="font-medium capitalize">{status.name}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Typography Section */}
          <Section id="typography" container={false} className="mb-12">
            <SectionHeader className="mb-8">
              <SectionTitle>Typography 字体排版</SectionTitle>
              <SectionDescription>
                使用 Tailwind 默认字号体系，中文使用系统中文字体栈，英文/数字使用 Inter。
              </SectionDescription>
            </SectionHeader>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 text-xs text-muted-foreground">H1 · text-6xl (desktop) / text-4xl (mobile)</div>
                    <h1 className="text-4xl md:text-6xl">启于今日，序向未来</h1>
                  </div>
                  <Separator />
                  <div>
                    <div className="mb-2 text-xs text-muted-foreground">H2 · text-4xl (desktop) / text-3xl (mobile)</div>
                    <h2 className="text-3xl md:text-4xl">AI 时代学习成长平台</h2>
                  </div>
                  <Separator />
                  <div>
                    <div className="mb-2 text-xs text-muted-foreground">H3 · text-3xl (desktop) / text-2xl (mobile)</div>
                    <h3 className="text-2xl md:text-3xl">个性化学习路径</h3>
                  </div>
                  <Separator />
                  <div>
                    <div className="mb-2 text-xs text-muted-foreground">H4 · text-2xl (desktop) / text-xl (mobile)</div>
                    <h4 className="text-xl md:text-2xl">导师全程指导</h4>
                  </div>
                  <Separator />
                  <div>
                    <div className="mb-2 text-xs text-muted-foreground">Body · text-base leading-relaxed</div>
                    <p className="text-base leading-relaxed">
                      QIXU 启序是 AI 时代的学习成长平台，致力于为学习者提供个性化的学习路径规划、
                      AI 智能辅助和导师全程指导。我们相信每个人都有独特的成长节奏，
                      让学习不再焦虑，让成长有迹可循。
                    </p>
                  </div>
                  <Separator />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <div className="mb-2 text-xs text-muted-foreground">text-sm</div>
                      <p className="text-sm text-muted-foreground">辅助说明文字</p>
                    </div>
                    <div>
                      <div className="mb-2 text-xs text-muted-foreground">text-xs</div>
                      <p className="text-xs text-muted-foreground">标签、脚注文字</p>
                    </div>
                    <div>
                      <div className="mb-2 text-xs text-muted-foreground">font-mono</div>
                      <code className="font-mono text-sm">const qixu = "design-system"</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Spacing, Radius & Shadows */}
          <div id="spacing" className="mb-12 grid gap-8 lg:grid-cols-2">
            {/* Radius */}
            <Section container={false}>
              <SectionHeader className="mb-6">
                <SectionTitle className="text-2xl">Radius 圆角</SectionTitle>
              </SectionHeader>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {radii.map((r) => (
                  <div key={r.name} className="text-center">
                    <div
                      className={`${r.className} mx-auto mb-2 flex h-16 w-16 items-center justify-center border border-border bg-card`}
                    />
                    <div className="text-xs text-muted-foreground">{r.name}</div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Shadows */}
            <Section container={false}>
              <SectionHeader className="mb-6">
                <SectionTitle className="text-2xl">Shadows 阴影</SectionTitle>
              </SectionHeader>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {shadows.map((s) => (
                  <div key={s.name} className="text-center">
                    <div
                      className={`${s.className} mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-lg bg-card`}
                    />
                    <div className="text-xs text-muted-foreground">{s.name}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Components Section */}
          <Section id="components" background="surface" container={false} className="mb-12 rounded-xl">
            <SectionHeader className="mb-8">
              <SectionTitle>Components 基础组件</SectionTitle>
              <SectionDescription>
                基于 shadcn/ui 构建的可复用 UI 组件，使用 cva 管理变体。
              </SectionDescription>
            </SectionHeader>

            {/* Buttons */}
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-semibold">Button 按钮</h3>
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button>
                  <Mail className="h-4 w-4" />
                  With Icon
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Badges */}
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-semibold">Badge 徽章</h3>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Input */}
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-semibold">Input 输入框</h3>
              <div className="grid max-w-sm gap-4">
                <Input placeholder="请输入内容..." />
                <div className="flex gap-2">
                  <Input placeholder="搜索..." />
                  <Button size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <Input placeholder="禁用状态" disabled />
              </div>
            </div>

            <Separator className="my-8" />

            {/* Cards */}
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-semibold">Card 卡片</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>默认卡片</CardTitle>
                    <CardDescription>卡片描述信息</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      这是卡片的正文内容区域，可以放置任何内容。
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">取消</Button>
                    <Button size="sm">确认</Button>
                  </CardFooter>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <Badge variant="success" className="w-fit">推荐</Badge>
                    <CardTitle className="mt-2">阴影卡片</CardTitle>
                    <CardDescription>带有中等阴影效果</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      卡片可以配合不同的阴影层级使用，营造层次感。
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/50">
                  <CardHeader>
                    <CardTitle>强调边框</CardTitle>
                    <CardDescription>使用主色边框突出</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      通过边框颜色可以表示选中或高亮状态。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* Motion Section */}
          <Section id="motion" container={false} className="mb-12">
            <SectionHeader className="mb-8">
              <SectionTitle>Motion 动效规范</SectionTitle>
              <SectionDescription>
                使用 framer-motion 实现组件级动画，时长 150ms–300ms，使用 ease-out 缓动。
                尊重 prefers-reduced-motion 设置。
              </SectionDescription>
            </SectionHeader>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Page Transition</CardTitle>
                  <CardDescription>页面切换：fade + slide 300ms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-muted p-4 font-mono text-xs">
                    <div>initial: opacity: 0, y: 10</div>
                    <div>animate: opacity: 1, y: 0</div>
                    <div>duration: 0.3s</div>
                    <div>ease: ease-out</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hover Scale</CardTitle>
                  <CardDescription>悬浮效果：scale 1.02</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full transition-transform hover:scale-[1.02]">
                    Hover Me
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Card Hover</CardTitle>
                  <CardDescription>卡片悬浮：translateY(-8px)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="cursor-pointer rounded-lg border border-border bg-card p-6 shadow-sm transition-transform duration-200 ease-out hover:-translate-y-2 hover:shadow-lg">
                    <p className="text-sm">悬浮此卡片查看效果</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Footer note */}
          <div className="rounded-xl border border-dashed border-border bg-muted/50 p-8 text-center">
            <h3 className="text-lg font-semibold">Design System Ready</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              设计系统 v1.0 已就绪，可用于 Sprint-002（Global Layout）及后续业务页面开发。
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Button asChild>
                <Link href="/">
                  返回首页
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
