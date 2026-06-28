import Link from "next/link";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Separator } from "@qixu/ui/separator";
import { footerNav, siteConfig, contactConfig, footerConfig } from "@qixu/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight">
                {siteConfig.nameEn}
              </span>
              <span className="text-sm text-muted-foreground">
                {siteConfig.nameZh}
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              {siteConfig.slogan}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {siteConfig.tagline}
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              {contactConfig.email && (
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  {contactConfig.email}
                </a>
              )}
              {contactConfig.phone && (
                <a
                  href={`tel:${contactConfig.phone}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="h-4 w-4" />
                  {contactConfig.phone}
                </a>
              )}
              {contactConfig.address && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {contactConfig.address}
                </div>
              )}
              {contactConfig.workHours && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {contactConfig.workHours}
                </div>
              )}
              {contactConfig.wechatQr.placeholder && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  微信公众号 · 即将开通
                </div>
              )}
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
            {footerConfig.copyright}
          </p>
          <div className="flex items-center gap-4">
            {footerConfig.legalLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
