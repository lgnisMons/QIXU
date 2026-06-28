import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Separator } from "@qixu/ui/separator";
import { footerNav, contactInfo } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight">QIXU</span>
              <span className="text-sm text-muted-foreground">启序</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              启于今日，序向未来。
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              AI 时代学习成长平台
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                {contactInfo.email}
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4" />
                {contactInfo.phone}
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {contactInfo.address}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {contactInfo.workHours}
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerNav).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} QIXU 启序. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              隐私政策
            </Link>
            <Link
              href="/about"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              服务条款
            </Link>
            <Link
              href="/contact"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              联系我们
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
