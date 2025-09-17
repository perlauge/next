// src/app/layout.tsx
import type { Metadata } from "next";
import Header from "./components/header/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Academy!",
  description: "Lær Next.js med Code Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="content">
          {children}
        </div>
      </body>
    </html>
  );
}