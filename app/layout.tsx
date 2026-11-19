import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE = "https://leolennards.vercel.app";
const TITLE = "Leo Lennards · IT Support & Security";
const DESC =
  "Portfolio of Leo Lennards: IT Support Technician in Cape Town working across Microsoft 365, Entra ID, Active Directory, endpoint security and networking.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESC, url: SITE, siteName: "Leo Lennards", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

export const viewport: Viewport = {
  themeColor: "#04060a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Leo Lennards",
  jobTitle: "IT Support Technician",
  url: SITE,
  address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressCountry: "ZA" },
  sameAs: ["https://www.linkedin.com/in/leolennards/", "https://github.com/leolennards"],
  knowsAbout: ["Microsoft 365", "Entra ID", "Active Directory", "Endpoint security", "Networking"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${jetbrains.variable}`}>
      <body className="crt">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
