import type { Metadata } from "next";
import { Instrument_Serif, Syne } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const syne = Syne({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paloma DELACROIX — Portfolio",
  description: "Designer & Développeuse créative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${instrumentSerif.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  );
}
