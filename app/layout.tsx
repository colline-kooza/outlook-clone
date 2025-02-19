import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
// import FooterBanner from "@/components/Footer";
const inter = Rethink_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Outlook Clone",
  description:
    "Outlook clone by Collinz dev",
  
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
  metadataBase: new URL("https://yourkartifydomain.com"),
  openGraph: {
    title: "Outlook Clone",
   
    url: "https://yourkartifydomain.com",
    siteName: "Outlook",
    images: [
      {
        url: "https://yourkartifydomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kartify Marketplace",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kartify Marketplace - Multi-Vendor E-commerce Platform",
    description:
      "A complete multi-vendor marketplace template built with Next.js and Prisma.",
    images: ["https://yourkartifydomain.com/twitter-image.jpg"],
  },
};
// const degular = localFont({
//   src: "./fonts/DegularDisplay-Semibold.otf",
//   variable: "--font-degular",              
//   weight: "400",                           
// });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
