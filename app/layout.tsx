import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Best Doctors Insurance | Global health, personal care",
  description:
    "International health insurance designed around your life, wherever it takes you.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
