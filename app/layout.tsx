import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
