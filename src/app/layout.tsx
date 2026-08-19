import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.holiu.net"),
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      className={`${playfair.variable} ${montserrat.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
