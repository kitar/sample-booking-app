import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "サンプル工務店 相談予約",
  description: "サンプル工務店の相談予約の受付",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <header>
          <Link href="/">サンプル工務店 相談予約</Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
