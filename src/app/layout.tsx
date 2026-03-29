import type { Metadata } from "next";
import { Nanum_Brush_Script } from "next/font/google";
import "./globals.css";

const nanumBrush = Nanum_Brush_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwritten",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Death Note",
  description: "저주",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${nanumBrush.variable} h-full`}>
      <body className="min-h-full overflow-hidden">{children}</body>
    </html>
  );
}
