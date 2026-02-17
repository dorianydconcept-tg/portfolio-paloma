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
      <body>
        <div className="glass-blobs">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
        {children}
      </body>
    </html>
  );
}
