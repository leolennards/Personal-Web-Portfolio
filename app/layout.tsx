import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leo Lennards · IT Support & Security",
  description:
    "Portfolio of Leo Lennards: IT Support Technician in Cape Town working across Microsoft 365, Entra ID, Active Directory, endpoint security and networking.",
  openGraph: {
    title: "Leo Lennards · IT Support & Security",
    description:
      "IT Support Technician in Cape Town. Microsoft 365, Entra ID, Active Directory, endpoint security and networking.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#04060a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${jetbrains.variable}`}>
      <body className="crt">{children}</body>
    </html>
  );
}
