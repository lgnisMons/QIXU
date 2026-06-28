import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { brandConfig } from "@qixu/config/brand";
import { seoConfig, organizationJsonLd } from "@qixu/config/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: brandConfig.name }],
  metadataBase: new URL(brandConfig.url),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: seoConfig.locale,
    siteName: seoConfig.siteName,
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    images: [seoConfig.ogImage],
  },
  twitter: {
    card: seoConfig.twitterCard,
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
  },
  robots: { index: true, follow: true },
  // Search console verification placeholders
  verification: {
    google: "REPLACE_WITH_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brandConfig.name,
    url: brandConfig.url,
    description: brandConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${brandConfig.url}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        {/* Google Search Console verification — replace with your code */}
        {/* <meta name="google-site-verification" content="REPLACE_WITH_YOUR_CODE" /> */}
        {/* Bing Webmaster verification — replace with your code */}
        {/* <meta name="msvalidate.01" content="REPLACE_WITH_YOUR_CODE" /> */}
      </head>
      <body className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
